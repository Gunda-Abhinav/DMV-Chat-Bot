import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for optimal performance
env.allowLocalModels = false;
env.useBrowserCache = true;

export class EmbeddingService {
  private static embedder: any = null;
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    console.log('Initializing embedding service with state-of-the-art model...');
    try {
      // Use the latest and most accurate embedding model
      this.embedder = await pipeline(
        'feature-extraction',
        'mixedbread-ai/mxbai-embed-xsmall-v1',
        { 
          device: 'webgpu',
          dtype: 'fp32'
        }
      );
      this.isInitialized = true;
      console.log('Embedding service initialized successfully with mxbai-embed-xsmall-v1');
    } catch (webgpuError) {
      console.warn('WebGPU not available, falling back to CPU:', webgpuError);
      try {
        // Fallback to CPU if WebGPU fails
        this.embedder = await pipeline(
          'feature-extraction',
          'mixedbread-ai/mxbai-embed-xsmall-v1',
          { device: 'cpu' }
        );
        this.isInitialized = true;
        console.log('Embedding service initialized successfully on CPU');
      } catch (error) {
        console.error('Failed to initialize embedding service:', error);
        throw error;
      }
    }
  }

  static async generateEmbedding(text: string): Promise<number[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const embedding = await this.embedder(text, {
        pooling: 'mean',
        normalize: true
      });
      return Array.from(embedding.data as Float32Array);
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  static async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const embeddings = await this.embedder(texts, {
        pooling: 'mean',
        normalize: true
      });
      
      // Handle batch results
      if (embeddings.dims && embeddings.dims.length > 1) {
        const batchSize = embeddings.dims[0];
        const embeddingSize = embeddings.dims[1];
        const results: number[][] = [];
        
        for (let i = 0; i < batchSize; i++) {
          const start = i * embeddingSize;
          const end = start + embeddingSize;
          results.push(Array.from(embeddings.data.slice(start, end)));
        }
        
        return results;
      } else {
        // Single embedding case
        return [Array.from(embeddings.data as Float32Array)];
      }
    } catch (error) {
      console.error('Error generating batch embeddings:', error);
      throw error;
    }
  }

  static cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    
    const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    return isNaN(similarity) ? 0 : similarity;
  }

  static getInitializationStatus(): boolean {
    return this.isInitialized;
  }
}
import { EmbeddingService } from './EmbeddingService';

export interface DocumentChunk {
  id: string;
  content: string;
  url: string;
  title: string;
  embedding?: number[];
  metadata?: {
    category: string;
    keywords: string[];
    relevanceScore?: number;
  };
}

export class DocumentProcessor {
  private static documents: DocumentChunk[] = [];
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;
    
    console.log('Initializing document processor...');
    try {
      await EmbeddingService.initialize();
      this.isInitialized = true;
      console.log('Document processor initialized successfully');
    } catch (error) {
      console.error('Failed to initialize document processor:', error);
      throw error;
    }
  }

  static async loadSampleDMVData(): Promise<DocumentChunk[]> {
    console.log('Loading enhanced DMV data...');
    
    const { getAllDMVData } = await import('../data/dmvData');
    const sampleData = getAllDMVData();
    
    const chunks: DocumentChunk[] = [];
    
    for (const item of sampleData) {
      // Enhanced text processing with better chunking
      const textChunks = this.intelligentChunkText(item.content, 400);
      
      textChunks.forEach((chunk, index) => {
        const keywords = this.extractKeywords(chunk);
        chunks.push({
          id: `${item.id}-chunk-${index}`,
          content: chunk,
          url: item.url,
          title: item.title,
          metadata: {
            category: item.category,
            keywords: keywords,
          }
        });
      });
    }
    
    console.log(`Loaded ${chunks.length} enhanced DMV data chunks`);
    return chunks;
  }

  private static extractKeywords(text: string): string[] {
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'must', 'shall', 'this', 'that', 'these', 'those'
    ]);

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word))
      .slice(0, 10); // Top 10 keywords
  }

  private static extractTextContent(doc: Document): string {
    // Remove script and style elements
    const scripts = doc.querySelectorAll('script, style, nav, header, footer');
    scripts.forEach(el => el.remove());
    
    // Get main content areas
    const contentSelectors = [
      'main', '.content', '.main-content', 
      'article', '.article', '.page-content',
      '.dmv-content', '#content'
    ];
    
    let content = '';
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        content = element.textContent || '';
        break;
      }
    }
    
    // Fallback to body if no main content found
    if (!content) {
      content = doc.body?.textContent || '';
    }
    
    // Clean up the text
    return content
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }

  private static intelligentChunkText(text: string, maxLength: number): string[] {
    // Split by paragraphs first, then by sentences if needed
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const chunks: string[] = [];
    
    for (const paragraph of paragraphs) {
      if (paragraph.length <= maxLength) {
        chunks.push(paragraph.trim());
      } else {
        // Split long paragraphs by sentences
        const sentences = paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
        let currentChunk = '';
        
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          const proposedChunk = currentChunk + (currentChunk ? '. ' : '') + trimmedSentence;
          
          if (proposedChunk.length > maxLength) {
            if (currentChunk) {
              chunks.push(currentChunk.trim());
              currentChunk = trimmedSentence;
            } else {
              // Handle very long sentences by splitting at word boundaries
              const words = trimmedSentence.split(' ');
              let wordChunk = '';
              for (const word of words) {
                if ((wordChunk + ' ' + word).length > maxLength) {
                  if (wordChunk) {
                    chunks.push(wordChunk.trim());
                    wordChunk = word;
                  } else {
                    chunks.push(word); // Single very long word
                  }
                } else {
                  wordChunk += (wordChunk ? ' ' : '') + word;
                }
              }
              if (wordChunk) currentChunk = wordChunk;
            }
          } else {
            currentChunk = proposedChunk;
          }
        }
        
        if (currentChunk) {
          chunks.push(currentChunk.trim());
        }
      }
    }
    
    return chunks.filter(chunk => chunk.length > 0);
  }

  static async generateEmbeddings(chunks: DocumentChunk[]): Promise<DocumentChunk[]> {
    console.log(`Generating high-quality embeddings for ${chunks.length} chunks...`);
    
    const chunksWithEmbeddings = [];
    const batchSize = 5; // Process in batches for better performance
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const texts = batch.map(chunk => chunk.content);
      
      try {
        const embeddings = await EmbeddingService.generateBatchEmbeddings(texts);
        
        for (let j = 0; j < batch.length; j++) {
          chunksWithEmbeddings.push({
            ...batch[j],
            embedding: embeddings[j]
          });
        }
        
        console.log(`Generated embeddings for ${Math.min(i + batchSize, chunks.length)}/${chunks.length} chunks`);
      } catch (error) {
        console.error(`Error generating embeddings for batch starting at ${i}:`, error);
        
        // Fallback to individual processing for this batch
        for (const chunk of batch) {
          try {
            const embedding = await EmbeddingService.generateEmbedding(chunk.content);
            chunksWithEmbeddings.push({
              ...chunk,
              embedding: embedding
            });
          } catch (individualError) {
            console.error(`Error generating embedding for chunk ${chunk.id}:`, individualError);
          }
        }
      }
    }
    
    console.log(`Generated embeddings for ${chunksWithEmbeddings.length} chunks`);
    return chunksWithEmbeddings;
  }

  static async processDocuments(): Promise<void> {
    try {
      await this.initialize();
      
      // Load safe sample DMV data instead of scraping
      const dmvChunks = await this.loadSampleDMVData();
      
      // Generate embeddings
      const chunksWithEmbeddings = await this.generateEmbeddings(dmvChunks);
      
      // Store documents
      this.documents = chunksWithEmbeddings;
      
      console.log(`Processed ${this.documents.length} documents successfully`);
    } catch (error) {
      console.error('Error processing documents:', error);
      throw error;
    }
  }

  static getDocuments(): DocumentChunk[] {
    return this.documents;
  }

  static async searchSimilarDocuments(query: string, topK: number = 5): Promise<DocumentChunk[]> {
    if (!EmbeddingService.getInitializationStatus()) {
      await EmbeddingService.initialize();
    }
    
    if (this.documents.length === 0) {
      console.warn('No documents available for search');
      return [];
    }
    
    try {
      // Generate embedding for the query
      const queryEmbedding = await EmbeddingService.generateEmbedding(query);
      
      // Calculate similarities with enhanced scoring
      const similarities = this.documents
        .filter(doc => doc.embedding && doc.embedding.length > 0)
        .map(doc => {
          const semanticSimilarity = EmbeddingService.cosineSimilarity(queryEmbedding, doc.embedding!);
          
          // Enhanced scoring with keyword matching
          const keywordBoost = this.calculateKeywordBoost(query, doc);
          const categoryBoost = this.calculateCategoryBoost(query, doc);
          
          const finalScore = semanticSimilarity * 0.7 + keywordBoost * 0.2 + categoryBoost * 0.1;
          
          return {
            ...doc,
            similarity: finalScore,
            metadata: {
              ...doc.metadata,
              relevanceScore: finalScore
            }
          };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
      
      console.log(`Found ${similarities.length} relevant documents for query: "${query}"`);
      similarities.forEach((doc, i) => {
        console.log(`${i + 1}. ${doc.title} (score: ${doc.similarity.toFixed(3)})`);
      });
      
      return similarities;
    } catch (error) {
      console.error('Error in semantic search:', error);
      return [];
    }
  }

  private static calculateKeywordBoost(query: string, doc: DocumentChunk): number {
    if (!doc.metadata?.keywords) return 0;
    
    const queryWords = query.toLowerCase().split(/\s+/);
    const matchingKeywords = doc.metadata.keywords.filter(keyword =>
      queryWords.some(word => word.includes(keyword) || keyword.includes(word))
    );
    
    return matchingKeywords.length / Math.max(doc.metadata.keywords.length, queryWords.length);
  }

  private static calculateCategoryBoost(query: string, doc: DocumentChunk): number {
    if (!doc.metadata?.category) return 0;
    
    const queryLower = query.toLowerCase();
    const category = doc.metadata.category.toLowerCase();
    
    // Check if query mentions the category
    if (queryLower.includes(category.replace('_', ' '))) {
      return 1.0;
    }
    
    // Check for related terms
    const categoryMappings: { [key: string]: string[] } = {
      'license_renewal': ['renew', 'renewal', 'license', 'expire'],
      'real_id': ['real id', 'realid', 'identification'],
      'appointment': ['appointment', 'schedule', 'book'],
      'vehicle_registration': ['vehicle', 'car', 'registration', 'smog'],
      'fees': ['fee', 'cost', 'price', 'payment'],
      'office_locations': ['office', 'location', 'address', 'hours']
    };
    
    const relatedTerms = categoryMappings[category] || [];
    const hasRelatedTerm = relatedTerms.some(term => queryLower.includes(term));
    
    return hasRelatedTerm ? 0.5 : 0;
  }
}
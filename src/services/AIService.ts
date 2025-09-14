import { DocumentProcessor, DocumentChunk } from './DocumentProcessor';
import { ResponseGenerator } from './ResponseGenerator';

export interface AIResponse {
  message: string;
  sources: string[];
  confidence: number;
}

export class AIService {
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing AI Service...');
      await DocumentProcessor.initialize();
      this.isInitialized = true;
      console.log('AI Service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI Service:', error);
      throw error;
    }
  }

  static async generateResponse(userQuery: string): Promise<AIResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Check for greetings or off-topic questions first
      const queryLower = userQuery.toLowerCase().trim();
      
      // Handle greetings
      if (this.isGreeting(queryLower)) {
        return {
          message: "Hello! I'm here to help you with California DMV services. You can ask me about driver's license renewal, REAL ID, vehicle registration, DMV appointments, fees, and office locations. What can I help you with today?",
          sources: [],
          confidence: 1.0
        };
      }

      // Handle off-topic questions
      if (this.isOffTopic(queryLower)) {
        return {
          message: "Thank you for asking! I'm specifically designed to help with California DMV services. Please feel free to ask me about driver's licenses, vehicle registration, REAL ID, appointments, fees, or DMV office locations. How can I assist you with DMV-related questions?",
          sources: [],
          confidence: 1.0
        };
      }

      // Search for relevant documents
      const relevantDocs = await DocumentProcessor.searchSimilarDocuments(userQuery, 3);
      
      if (relevantDocs.length === 0) {
        return {
          message: "I couldn't find specific information about that in the DMV documents. Could you please rephrase your question or ask about something more specific related to California DMV services?",
          sources: [],
          confidence: 0.1
        };
      }

      // Create context from relevant documents
      const context = relevantDocs
        .map(doc => doc.content)
        .join('\n\n');

      // Generate enhanced response using the new response generator
      const response = ResponseGenerator.generateContextualResponse(userQuery, relevantDocs);
      
      // Get the best matching document for URL
      const primaryDoc = relevantDocs[0];
      
      return {
        message: response.message + `\n\n🔗 **Visit the official DMV page:** ${primaryDoc.url}`,
        sources: relevantDocs.map(doc => doc.url),
        confidence: response.confidence
      };
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        message: "I'm experiencing some technical difficulties. Please try asking your question again.",
        sources: [],
        confidence: 0.1
      };
    }
  }

  private static isGreeting(query: string): boolean {
    const greetings = [
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
      'how are you', 'how do you do', 'what\'s up', 'whats up', 'greetings'
    ];
    
    return greetings.some(greeting => 
      query.includes(greeting) || query === greeting
    );
  }

  private static isOffTopic(query: string): boolean {
    const dmvKeywords = [
      'dmv', 'license', 'registration', 'real id', 'realid', 'appointment',
      'vehicle', 'driver', 'car', 'fee', 'cost', 'office', 'renew', 'california'
    ];
    
    // If query contains DMV-related keywords, it's not off-topic
    if (dmvKeywords.some(keyword => query.includes(keyword))) {
      return false;
    }
    
    // Check for common off-topic patterns
    const offTopicPatterns = [
      'weather', 'time', 'date', 'recipe', 'music', 'movie', 'sports',
      'news', 'politics', 'health', 'medicine', 'travel', 'shopping',
      'restaurant', 'food', 'programming', 'technology', 'job', 'work'
    ];
    
    return offTopicPatterns.some(pattern => query.includes(pattern)) ||
           query.length > 50; // Long queries without DMV keywords are likely off-topic
  }

  static async trainModel(): Promise<void> {
    console.log('🚀 Starting Enhanced DMV AI Training...');
    
    try {
      await DocumentProcessor.processDocuments();
      console.log('✅ Enhanced DMV knowledge base training completed successfully!');
      console.log('');
      console.log('🎯 Features enabled:');
      console.log('  • State-of-the-art semantic embeddings (mxbai-embed-xsmall-v1)');
      console.log('  • Intelligent intent classification with 9+ categories');
      console.log('  • Multi-factor relevance scoring');
      console.log('  • Context-aware response generation');
      console.log('  • Beautiful formatted responses with markdown');
      console.log('  • Greeting and off-topic handling');
      console.log('  • WebGPU acceleration with CPU fallback');
      console.log('');
      console.log('📚 Knowledge base: 10 comprehensive DMV topics');
      console.log('🔍 Search: Advanced semantic similarity matching');
      console.log('💬 Responses: Professional, detailed, and actionable');
      
      // Run quick validation
      const { AISystemValidator } = await import('./AISystemValidator');
      console.log('');
      await AISystemValidator.quickPerformanceTest();
      
    } catch (error) {
      console.error('❌ Error during enhanced training:', error);
      throw error;
    }
  }
}
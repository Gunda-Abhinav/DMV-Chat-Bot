import { AIService } from '../services/AIService';

export interface SystemTest {
  query: string;
  expectedIntent: string;
  description: string;
}

export class AISystemValidator {
  private static testQueries: SystemTest[] = [
    {
      query: "How do I renew my driver's license online?",
      expectedIntent: "license_renewal",
      description: "Online license renewal"
    },
    {
      query: "What documents do I need for a REAL ID?",
      expectedIntent: "real_id",
      description: "REAL ID documentation"
    },
    {
      query: "How do I schedule a DMV appointment?",
      expectedIntent: "appointment",
      description: "Appointment scheduling"
    },
    {
      query: "When do I need a smog check for my car registration?",
      expectedIntent: "vehicle_registration",
      description: "Vehicle registration smog requirements"
    },
    {
      query: "How much does it cost to renew my license?",
      expectedIntent: "fees",
      description: "License renewal fees"
    },
    {
      query: "Where is the nearest DMV office?",
      expectedIntent: "office_locations",
      description: "DMV office locations"
    },
    {
      query: "Hi, how are you doing today?",
      expectedIntent: "greeting",
      description: "Basic greeting handling"
    },
    {
      query: "What's the weather like?",
      expectedIntent: "off_topic",
      description: "Off-topic question handling"
    }
  ];

  static async runSystemValidation(): Promise<void> {
    console.log('🧪 Running AI System Validation...');
    console.log('='.repeat(50));
    
    let passedTests = 0;
    const totalTests = this.testQueries.length;
    
    for (let i = 0; i < this.testQueries.length; i++) {
      const test = this.testQueries[i];
      console.log(`\n📋 Test ${i + 1}/${totalTests}: ${test.description}`);
      console.log(`Query: "${test.query}"`);
      
      try {
        const startTime = performance.now();
        const response = await AIService.generateResponse(test.query);
        const endTime = performance.now();
        
        console.log(`⚡ Response time: ${(endTime - startTime).toFixed(0)}ms`);
        console.log(`🎯 Confidence: ${(response.confidence * 100).toFixed(1)}%`);
        console.log(`📝 Response preview: ${response.message.substring(0, 100)}...`);
        console.log(`🔗 Sources: ${response.sources.length}`);
        
        // Check if response seems appropriate
        const isAppropriate = this.validateResponse(test, response);
        if (isAppropriate) {
          console.log('✅ Test PASSED');
          passedTests++;
        } else {
          console.log('❌ Test FAILED');
        }
        
      } catch (error) {
        console.error(`💥 Test ERROR:`, error);
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`🏁 Validation Complete: ${passedTests}/${totalTests} tests passed`);
    console.log(`📊 Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
      console.log('🎉 All tests passed! System is working optimally.');
    } else {
      console.log('⚠️ Some tests failed. Review responses for quality.');
    }
  }

  private static validateResponse(test: SystemTest, response: any): boolean {
    // Basic validation checks
    if (!response.message || response.message.length < 20) {
      return false;
    }
    
    if (response.confidence < 0.1) {
      return false;
    }
    
    // Intent-specific validation
    const message = response.message.toLowerCase();
    
    switch (test.expectedIntent) {
      case 'license_renewal':
        return message.includes('license') && (message.includes('renew') || message.includes('renewal'));
      
      case 'real_id':
        return message.includes('real id') || message.includes('realid');
      
      case 'appointment':
        return message.includes('appointment') || message.includes('schedule');
      
      case 'vehicle_registration':
        return message.includes('registration') || message.includes('vehicle');
      
      case 'fees':
        return message.includes('fee') || message.includes('cost') || message.includes('$');
      
      case 'office_locations':
        return message.includes('office') || message.includes('location');
      
      case 'greeting':
        return message.includes('hello') || message.includes('help') || message.includes('dmv');
      
      case 'off_topic':
        return message.includes('dmv') && (message.includes('thank you') || message.includes('help'));
      
      default:
        return true;
    }
  }

  static async quickPerformanceTest(): Promise<void> {
    console.log('⚡ Running Quick Performance Test...');
    
    const testQuery = "How do I renew my license?";
    const runs = 3;
    const times: number[] = [];
    
    for (let i = 0; i < runs; i++) {
      const start = performance.now();
      await AIService.generateResponse(testQuery);
      const end = performance.now();
      times.push(end - start);
    }
    
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    console.log(`📊 Average response time: ${avgTime.toFixed(0)}ms`);
    console.log(`⚡ Performance: ${avgTime < 1000 ? 'Excellent' : avgTime < 2000 ? 'Good' : 'Needs Improvement'}`);
  }
}
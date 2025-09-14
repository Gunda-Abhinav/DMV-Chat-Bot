import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('Firecrawl API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing Firecrawl API key...');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      const testResponse = await this.firecrawlApp.scrapeUrl('https://example.com');
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async crawlDMVWebsite(): Promise<{ success: boolean; error?: string; data?: any[] }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'Firecrawl API key not found. Please set your API key first.' };
    }

    try {
      console.log('Starting DMV website crawl with Firecrawl...');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const dmvUrls = [
        'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/',
        'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/renew-dl-id/',
        'https://www.dmv.ca.gov/portal/real-id/',
        'https://www.dmv.ca.gov/portal/vehicle-registration/',
        'https://www.dmv.ca.gov/portal/make-an-appointment/',
        'https://www.dmv.ca.gov/portal/dmv-fees/',
        'https://www.dmv.ca.gov/portal/office-locations/'
      ];

      const allData: any[] = [];

      for (const url of dmvUrls) {
        try {
          console.log(`Scraping: ${url}`);
          const response = await this.firecrawlApp.scrapeUrl(url, {
            formats: ['markdown'],
            onlyMainContent: true
          });

          if (response.success && (response as any).data) {
            const data = (response as any).data;
            allData.push({
              url,
              title: data.title || 'DMV Information',
              content: data.markdown || data.content || '',
              metadata: data.metadata || {}
            });
          }

          // Rate limiting - be respectful
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.warn(`Failed to scrape ${url}:`, error);
        }
      }

      console.log(`Successfully scraped ${allData.length} DMV pages`);
      return { success: true, data: allData };

    } catch (error) {
      console.error('Error during DMV crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to crawl DMV website' 
      };
    }
  }
}
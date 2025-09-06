import OpenAI from 'openai';

export interface WebSearchOptions {
  model?: string;
  temperature?: number;
  verbose?: boolean;
  allowedDomains?: string[];
  userLocation?: {
    type: 'approximate';
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
  };
  searchContextSize?: 'low' | 'medium' | 'high';
}

export interface WebSearchResult {
  output: string;
  citations?: Array<{
    url: string;
    title?: string;
    start_index: number;
    end_index: number;
  }>;
  sources?: Array<{
    url: string;
    domain?: string;
  }>;
  searchCalls?: Array<{
    id: string;
    action: string;
    query?: string;
    domains?: string[];
  }>;
  error?: string;
}

export class WebSearchAgent {
  private openai: OpenAI;

  constructor(openaiApiKey?: string, public options: WebSearchOptions = {}) {
    this.openai = new OpenAI({
      apiKey: openaiApiKey || process.env.OPENAI_API_KEY,
    });
  }

  async initialize() {
    try {
      await this.openai.models.list();
      if (this.options.verbose) {
        console.log('✅ OpenAI connection established for web search');
      }
    } catch (error) {
      throw new Error(`Failed to initialize OpenAI client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async search(query: string): Promise<WebSearchResult> {
    try {
      if (this.options.verbose) {
        console.log(`🔍 Searching the web for: ${query}`);
      }

      const model = this.options.model || 'gpt-4o';

      // Build web search tool configuration
      const webSearchTool: any = {
        type: 'web_search'
      };

      // Add filters if specified
      if (this.options.allowedDomains && this.options.allowedDomains.length > 0) {
        webSearchTool.filters = {
          allowed_domains: this.options.allowedDomains
        };
      }

      // Add user location if specified
      if (this.options.userLocation) {
        webSearchTool.user_location = this.options.userLocation;
      }

      // Add search context size if specified
      if (this.options.searchContextSize) {
        webSearchTool.search_context_size = this.options.searchContextSize;
      }

      // Use the new Responses API with native web search
      const response = await this.openai.responses.create({
        model,
        tools: [webSearchTool],
        input: query
      });

      if (this.options.verbose) {
        console.log(`✅ Web search completed`);
        console.log(`📊 Response items: ${response.output?.length || 0}`);
      }

      // Extract the main text response
      const outputText = response.output_text || 'No response generated';

      // Process the output items to extract citations and sources
      const citations: Array<{url: string; title?: string; start_index: number; end_index: number}> = [];
      const sources: Array<{url: string; domain?: string}> = [];
      const searchCalls: Array<{id: string; action: string; query?: string; domains?: string[]}> = [];

      if (response.output && Array.isArray(response.output)) {
        for (const item of response.output) {
          // Extract web search calls
          if (item.type === 'web_search_call') {
            const searchCall: any = {
              id: item.id,
              action: (item as any).action?.type || 'search'
            };

            if ((item as any).action?.query) {
              searchCall.query = (item as any).action.query;
            }
            if ((item as any).action?.domains) {
              searchCall.domains = (item as any).action.domains;
            }
            if ((item as any).action?.sources) {
              // Extract sources from the search call
              for (const source of (item as any).action.sources) {
                sources.push({
                  url: source.name || source.url || 'unknown',
                  domain: source.type || 'api'
                });
              }
            }
            
            searchCalls.push(searchCall);
          }

          // Extract message content with citations
          if (item.type === 'message' && (item as any).content && Array.isArray((item as any).content)) {
            for (const content of (item as any).content) {
              if (content.type === 'output_text' && content.annotations) {
                for (const annotation of content.annotations) {
                  if (annotation.type === 'url_citation') {
                    citations.push({
                      url: annotation.url,
                      title: annotation.title,
                      start_index: annotation.start_index,
                      end_index: annotation.end_index
                    });
                  }
                }
              }
            }
          }
        }
      }

      return {
        output: outputText,
        citations,
        sources,
        searchCalls
      };

    } catch (error) {
      console.error('Web search error:', error);
      
      // If Responses API is not available, fall back to a helpful error message
      if (error instanceof Error && error.message.includes('responses')) {
        return {
          output: `I encountered an issue with the web search API. This may be because the Responses API with web search is not yet available in your region or account tier. 

The query was: "${query}"

For now, I can provide general information based on my training data, but for real-time web search results, please ensure:
1. Your OpenAI account has access to the Responses API
2. The web_search tool is enabled for your account
3. You're using a supported model (gpt-4o, gpt-4o-mini, gpt-5, o3, o4-mini)`,
          error: error.message
        };
      }

      return {
        output: 'I encountered an error while processing your search request. Please check your OpenAI API configuration and try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Convenience method for supplier-related web searches
  async searchSupplierInfo(companyName: string, domain?: string): Promise<WebSearchResult> {
    const query = domain 
      ? `Find recent news and information about ${companyName} company (${domain})`
      : `Find recent news and information about ${companyName} company`;

    return this.search(query);
  }

  // Method for industry research
  async searchIndustryTrends(industry: string, region?: string): Promise<WebSearchResult> {
    const locationPart = region ? ` in ${region}` : '';
    const query = `What are the latest trends and developments in the ${industry} industry${locationPart}?`;

    return this.search(query);
  }

  // Method for competitive analysis
  async searchCompetitors(companyName: string): Promise<WebSearchResult> {
    const query = `Who are the main competitors of ${companyName}? What is their market position and recent developments?`;

    return this.search(query);
  }

  // Method for compliance and regulatory information
  async searchCompliance(industry: string, region: string = 'US'): Promise<WebSearchResult> {
    const query = `What are the current regulatory requirements and compliance standards for ${industry} companies in ${region}?`;

    // Create a temporary agent with compliance-specific allowed domains
    const complianceAgent = new WebSearchAgent(process.env.OPENAI_API_KEY, {
      ...this.options,
      allowedDomains: [
        'sec.gov',
        'fda.gov',
        'epa.gov',
        'osha.gov',
        'ftc.gov',
        'cftc.gov',
        'finra.org',
        'iso.org'
      ]
    });

    return complianceAgent.search(query);
  }
}
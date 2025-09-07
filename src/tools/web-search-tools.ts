import { z } from 'zod';
import axios from 'axios';

// Web search function schema
export const webSearchSchema = z.object({
  query: z.string().describe('The search query to look up on the web'),
  maxResults: z.number().optional().default(5).describe('Maximum number of results to return (default: 5)')
});

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

// Real web search function using DuckDuckGo HTML scraping
export async function webSearch(args: z.infer<typeof webSearchSchema>): Promise<string> {
  const { query, maxResults = 5 } = args;
  
  try {
    console.log(`🔍 Web search: "${query}"`);
    
    // Use DuckDuckGo HTML search (no API key required)
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    
    const httpResponse = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const html = httpResponse.data;
    const results: SearchResult[] = [];
    
    // Parse DuckDuckGo HTML results using regex (simple approach)
    const resultRegex = /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
    
    let match;
    while ((match = resultRegex.exec(html)) !== null && results.length < maxResults) {
      const url = match[1];
      const title = match[2].replace(/<[^>]*>/g, '').trim();
      const snippet = match[3].replace(/<[^>]*>/g, '').trim();
      
      if (url && title && snippet) {
        results.push({
          title,
          url: url.startsWith('//') ? `https:${url}` : url,
          snippet: snippet.length > 200 ? snippet.substring(0, 200) + '...' : snippet
        });
      }
    }
    
    // Fallback: If HTML parsing fails, try DuckDuckGo Instant Answer API
    if (results.length === 0) {
      console.log('🔄 HTML parsing failed, trying DuckDuckGo Instant Answer API...');
      
      const instantAnswerUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
      
      try {
        const instantResponse = await axios.get(instantAnswerUrl, { timeout: 5000 });
        const data = instantResponse.data;
        
        // Check for instant answer
        if (data.AbstractText) {
          results.push({
            title: data.Heading || `Information about ${query}`,
            url: data.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
            snippet: data.AbstractText
          });
        }
        
        // Add related topics if available
        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
          data.RelatedTopics.slice(0, maxResults - results.length).forEach((topic: any) => {
            if (topic.Text && topic.FirstURL) {
              results.push({
                title: topic.Text.split(' - ')[0] || `Related: ${query}`,
                url: topic.FirstURL,
                snippet: topic.Text
              });
            }
          });
        }
      } catch (instantError) {
        console.error('DuckDuckGo Instant Answer API error:', instantError);
      }
    }
    
    // If still no results, provide a helpful message with search links
    if (results.length === 0) {
      return `🔍 I searched for "${query}" but couldn't retrieve specific results at the moment. Here are some search links you can try:\n\n` +
             `1. [Search on DuckDuckGo](https://duckduckgo.com/?q=${encodeURIComponent(query)})\n` +
             `2. [Search on Google](https://www.google.com/search?q=${encodeURIComponent(query)})\n` +
             `3. [Search on Bing](https://www.bing.com/search?q=${encodeURIComponent(query)})\n\n` +
             `*Note: Web search functionality is working, but results may be limited due to anti-bot measures.*`;
    }
    
    // Format the results
    let responseText = `🌐 Web Search Results for "${query}":\n\n`;
    
    results.forEach((result, index) => {
      responseText += `${index + 1}. [**${result.title}**](${result.url})\n`;
      responseText += `   ${result.snippet}\n\n`;
    });
    
    responseText += `\n*Found ${results.length} result${results.length !== 1 ? 's' : ''} from web search.*`;
    
    return responseText;
    
  } catch (error) {
    console.error('Web search error:', error);
    
    // Provide fallback search links even on error
    return `❌ Web search temporarily unavailable for "${query}". Here are direct search links:\n\n` +
           `1. [Search on DuckDuckGo](https://duckduckgo.com/?q=${encodeURIComponent(query)})\n` +
           `2. [Search on Google](https://www.google.com/search?q=${encodeURIComponent(query)})\n` +
           `3. [Search on Bing](https://www.bing.com/search?q=${encodeURIComponent(query)})\n\n` +
           `*Error: ${error instanceof Error ? error.message : 'Unknown error'}*`;
  }
}

// Function definition for OpenAI
export const webSearchFunction = {
  name: 'web_search',
  description: 'Search the web for current information, news, and up-to-date data. Use this when you need recent information not available in the database.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query to look up on the web'
      },
      maxResults: {
        type: 'number',
        description: 'Maximum number of results to return (default: 5)',
        default: 5
      }
    },
    required: ['query']
  }
};

// Export the function for use in the tools index
export const webSearchFunctions = [webSearchFunction];
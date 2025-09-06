import { WebSearchAgent, WebSearchResult } from '../agents/websearch-agent';

// Initialize web search agent
const webSearchAgent = new WebSearchAgent(process.env.OPENAI_API_KEY, {
  model: 'gpt-4o',
  verbose: true,
  searchContextSize: 'medium'
});

// Initialize the agent (we'll do this once)
let agentInitialized = false;
async function ensureAgentInitialized() {
  if (!agentInitialized) {
    await webSearchAgent.initialize();
    agentInitialized = true;
  }
}

export async function performWebSearch(args: {
  query: string;
  allowedDomains?: string[];
  userLocation?: {
    type: 'approximate';
    country?: string;
    city?: string;
    region?: string;
    timezone?: string;
  };
  searchContextSize?: 'low' | 'medium' | 'high';
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  // Create a temporary agent with the specified options
  const searchAgent = new WebSearchAgent(process.env.OPENAI_API_KEY, {
    model: 'gpt-4o',
    verbose: true,
    allowedDomains: args.allowedDomains,
    userLocation: args.userLocation,
    searchContextSize: args.searchContextSize || 'medium'
  });

  await searchAgent.initialize();
  return searchAgent.search(args.query);
}

export async function searchSupplierInfo(args: {
  companyName: string;
  domain?: string;
  includeCompetitors?: boolean;
  includeIndustryTrends?: boolean;
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  let query = `Find recent news, information, and updates about ${args.companyName} company`;
  
  if (args.domain) {
    query += ` (${args.domain})`;
  }

  if (args.includeCompetitors) {
    query += '. Also include information about their main competitors and market position.';
  }

  if (args.includeIndustryTrends) {
    query += '. Include relevant industry trends and market developments.';
  }

  return webSearchAgent.search(query);
}

export async function searchIndustryTrends(args: {
  industry: string;
  region?: string;
  timeframe?: string;
  focusAreas?: string[];
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  let query = `What are the latest trends and developments in the ${args.industry} industry`;
  
  if (args.region) {
    query += ` in ${args.region}`;
  }

  if (args.timeframe) {
    query += ` ${args.timeframe}`;
  }

  if (args.focusAreas && args.focusAreas.length > 0) {
    query += `? Focus on: ${args.focusAreas.join(', ')}.`;
  } else {
    query += '?';
  }

  return webSearchAgent.search(query);
}

export async function searchCompetitiveAnalysis(args: {
  companyName: string;
  industry?: string;
  region?: string;
  includeFinancials?: boolean;
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  let query = `Who are the main competitors of ${args.companyName}? What is their market position, recent developments, and competitive advantages?`;

  if (args.industry) {
    query += ` Focus on the ${args.industry} industry.`;
  }

  if (args.region) {
    query += ` Include regional competitive landscape in ${args.region}.`;
  }

  if (args.includeFinancials) {
    query += ' Include financial performance and market share data where available.';
  }

  return webSearchAgent.search(query);
}

export async function searchComplianceInfo(args: {
  industry: string;
  region?: string;
  specificRequirements?: string[];
  recentChanges?: boolean;
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  const region = args.region || 'US';
  let query = `What are the current regulatory requirements and compliance standards for ${args.industry} companies in ${region}?`;

  if (args.specificRequirements && args.specificRequirements.length > 0) {
    query += ` Focus on: ${args.specificRequirements.join(', ')}.`;
  }

  if (args.recentChanges) {
    query += ' Include any recent regulatory changes or updates.';
  }

  // Use compliance-specific domains
  const complianceAgent = new WebSearchAgent(process.env.OPENAI_API_KEY, {
    model: 'gpt-4o',
    verbose: true,
    searchContextSize: 'high',
    allowedDomains: [
      'sec.gov',
      'fda.gov',
      'epa.gov',
      'osha.gov',
      'ftc.gov',
      'cftc.gov',
      'finra.org',
      'iso.org',
      'regulations.gov',
      'gpo.gov'
    ]
  });

  await complianceAgent.initialize();
  return complianceAgent.search(query);
}

export async function searchMarketResearch(args: {
  topic: string;
  industry?: string;
  region?: string;
  timeframe?: string;
  includeDataSources?: boolean;
}): Promise<WebSearchResult> {
  await ensureAgentInitialized();

  let query = `Market research and analysis for ${args.topic}`;

  if (args.industry) {
    query += ` in the ${args.industry} industry`;
  }

  if (args.region) {
    query += ` in ${args.region}`;
  }

  if (args.timeframe) {
    query += ` (${args.timeframe})`;
  }

  if (args.includeDataSources) {
    query += '. Include market size, growth rates, key players, and data sources.';
  }

  return webSearchAgent.search(query);
}

// OpenAI function definitions for the web search tools
export const webSearchFunctions = [
  {
    name: 'perform_web_search',
    description: 'Perform a general web search using OpenAI\'s native web search. Returns current information with citations and sources.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The search query to execute'
        },
        allowedDomains: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional list of domains to restrict search to (e.g., ["sec.gov", "reuters.com"])'
        },
        userLocation: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['approximate'] },
            country: { type: 'string', description: 'Two-letter ISO country code (e.g., "US")' },
            city: { type: 'string', description: 'City name' },
            region: { type: 'string', description: 'Region or state name' },
            timezone: { type: 'string', description: 'IANA timezone (e.g., "America/Chicago")' }
          },
          description: 'Optional user location for geographically relevant results'
        },
        searchContextSize: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
          description: 'Amount of context to retrieve: low (fastest), medium (balanced), high (most comprehensive)'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'search_supplier_info',
    description: 'Search for recent news and information about a specific supplier company. Great for due diligence and relationship management.',
    parameters: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string',
          description: 'Name of the supplier company to search for'
        },
        domain: {
          type: 'string',
          description: 'Optional company domain/website to help identify the correct company'
        },
        includeCompetitors: {
          type: 'boolean',
          description: 'Whether to include information about competitors and market position'
        },
        includeIndustryTrends: {
          type: 'boolean',
          description: 'Whether to include relevant industry trends and market developments'
        }
      },
      required: ['companyName']
    }
  },
  {
    name: 'search_industry_trends',
    description: 'Search for latest trends and developments in a specific industry. Useful for market intelligence and strategic planning.',
    parameters: {
      type: 'object',
      properties: {
        industry: {
          type: 'string',
          description: 'Industry to research (e.g., "automotive", "healthcare", "technology")'
        },
        region: {
          type: 'string',
          description: 'Optional geographic region to focus on'
        },
        timeframe: {
          type: 'string',
          description: 'Optional timeframe (e.g., "in 2025", "over the last year")'
        },
        focusAreas: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific areas to focus on (e.g., ["sustainability", "digital transformation", "supply chain"])'
        }
      },
      required: ['industry']
    }
  },
  {
    name: 'search_competitive_analysis',
    description: 'Search for competitive analysis information about a company and its competitors. Useful for understanding market position.',
    parameters: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string',
          description: 'Name of the company to analyze'
        },
        industry: {
          type: 'string',
          description: 'Optional industry context for more focused results'
        },
        region: {
          type: 'string',
          description: 'Optional geographic region for regional competitive analysis'
        },
        includeFinancials: {
          type: 'boolean',
          description: 'Whether to include financial performance and market share data'
        }
      },
      required: ['companyName']
    }
  },
  {
    name: 'search_compliance_info',
    description: 'Search for regulatory requirements and compliance standards. Uses trusted government and regulatory sources.',
    parameters: {
      type: 'object',
      properties: {
        industry: {
          type: 'string',
          description: 'Industry to search compliance requirements for'
        },
        region: {
          type: 'string',
          description: 'Geographic region (default: US)'
        },
        specificRequirements: {
          type: 'array',
          items: { type: 'string' },
          description: 'Specific compliance areas to focus on (e.g., ["data privacy", "environmental", "safety"])'
        },
        recentChanges: {
          type: 'boolean',
          description: 'Whether to focus on recent regulatory changes and updates'
        }
      },
      required: ['industry']
    }
  },
  {
    name: 'search_market_research',
    description: 'Search for market research and analysis on a specific topic. Returns market size, trends, and key player information.',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Topic or market to research'
        },
        industry: {
          type: 'string',
          description: 'Optional industry context'
        },
        region: {
          type: 'string',
          description: 'Optional geographic region'
        },
        timeframe: {
          type: 'string',
          description: 'Optional timeframe for the research'
        },
        includeDataSources: {
          type: 'boolean',
          description: 'Whether to include market size, growth rates, and data sources'
        }
      },
      required: ['topic']
    }
  }
];
export declare class DatabaseAgent {
    private options;
    private agent;
    private llm;
    constructor(openaiApiKey?: string, options?: {
        temperature?: number;
        model?: string;
        maxTokens?: number;
        verbose?: boolean;
    });
    initialize(): Promise<void>;
    private initializeAgent;
    query(input: string, chatHistory?: string[]): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    getSupplierInfo(supplierIdOrDomain: number | string): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    logInteraction(supplierId: number, summary: string, channel: string, sentiment: 'positive' | 'neutral' | 'negative', contactId?: number): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    searchSuppliers(criteria: string): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    addNote(supplierId: number, note: string, authorId?: string): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    analyzeSentiment(supplierId: number, days?: number): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    getAvailableTools(): {
        name: string;
        description: string;
    }[];
    testConnection(): Promise<{
        success: boolean;
        message: string;
        result: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        result?: undefined;
    }>;
}
//# sourceMappingURL=database-agent.d.ts.map
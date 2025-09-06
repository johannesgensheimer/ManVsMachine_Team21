export declare class SupplierManagementApp {
    private agent;
    constructor();
    initialize(): Promise<boolean>;
    query(input: string, chatHistory?: string[]): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    getSupplierOverview(supplierIdOrDomain: number | string): Promise<{
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
    analyzeSentimentTrends(supplierId: number, days?: number): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    cleanup(): Promise<void>;
}
export { DatabaseAgent } from './agents/database-agent';
export * from './tools';
export * from './types/database';
//# sourceMappingURL=index.d.ts.map
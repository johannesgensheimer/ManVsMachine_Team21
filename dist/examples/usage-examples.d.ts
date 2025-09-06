export declare class UseCaseExamples {
    private app;
    constructor();
    initialize(): Promise<boolean>;
    onboardNewSupplier(name: string, domain: string, contactName: string, contactEmail: string, contactTitle: string): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    weeklyRelationshipReview(): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    prepareForMeeting(supplierName: string): Promise<{
        output: string;
        intermediateSteps?: any[];
        error?: string;
    }>;
    cleanup(): Promise<void>;
}
//# sourceMappingURL=usage-examples.d.ts.map
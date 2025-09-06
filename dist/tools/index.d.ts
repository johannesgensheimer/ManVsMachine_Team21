export { getSupplierOverviewTool, searchSuppliersTool, updateSupplierStatusTool, createSupplierTool } from './supplier-tools';
export { manageContactTool, searchContactsTool } from './contact-tools';
export { logInteractionTool, getInteractionHistoryTool, analyzeSentimentTrendsTool } from './interaction-tools';
export { addNoteTool, getNotesTool, searchNotesTool, manageNoteTool } from './note-tools';
export declare const allTools: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
    domain: import("zod").ZodOptional<import("zod").ZodString>;
    includeDays: import("zod").ZodDefault<import("zod").ZodNumber>;
    includeNotes: import("zod").ZodDefault<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    includeDays: number;
    includeNotes: boolean;
    domain?: string | undefined;
    supplierId?: number | undefined;
}, {
    domain?: string | undefined;
    supplierId?: number | undefined;
    includeDays?: number | undefined;
    includeNotes?: boolean | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    domain: import("zod").ZodOptional<import("zod").ZodString>;
    status: import("zod").ZodOptional<import("zod").ZodString>;
    tier: import("zod").ZodOptional<import("zod").ZodString>;
    createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
    createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    name?: string | undefined;
    domain?: string | undefined;
    status?: string | undefined;
    tier?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
}, {
    name?: string | undefined;
    domain?: string | undefined;
    status?: string | undefined;
    tier?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
    limit?: number | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodNumber;
    status: import("zod").ZodOptional<import("zod").ZodString>;
    tier: import("zod").ZodOptional<import("zod").ZodString>;
    reason: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    supplierId: number;
    status?: string | undefined;
    tier?: string | undefined;
    reason?: string | undefined;
}, {
    supplierId: number;
    status?: string | undefined;
    tier?: string | undefined;
    reason?: string | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodString;
    domain: import("zod").ZodString;
    status: import("zod").ZodDefault<import("zod").ZodString>;
    tier: import("zod").ZodDefault<import("zod").ZodString>;
    initialNote: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    domain: string;
    status: string;
    tier: string;
    initialNote?: string | undefined;
}, {
    name: string;
    domain: string;
    status?: string | undefined;
    tier?: string | undefined;
    initialNote?: string | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    action: import("zod").ZodEnum<["create", "update", "get", "delete"]>;
    contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
    supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
    firstName: import("zod").ZodOptional<import("zod").ZodString>;
    lastName: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodOptional<import("zod").ZodString>;
    email: import("zod").ZodOptional<import("zod").ZodString>;
    phone: import("zod").ZodOptional<import("zod").ZodString>;
    linkedinUrl: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    action: "update" | "create" | "get" | "delete";
    supplierId?: number | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    title?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    linkedinUrl?: string | undefined;
    contactId?: number | undefined;
}, {
    action: "update" | "create" | "get" | "delete";
    supplierId?: number | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    title?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    linkedinUrl?: string | undefined;
    contactId?: number | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    email: import("zod").ZodOptional<import("zod").ZodString>;
    title: import("zod").ZodOptional<import("zod").ZodString>;
    supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
    supplierName: import("zod").ZodOptional<import("zod").ZodString>;
    hasLinkedIn: import("zod").ZodOptional<import("zod").ZodBoolean>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    name?: string | undefined;
    supplierId?: number | undefined;
    title?: string | undefined;
    email?: string | undefined;
    supplierName?: string | undefined;
    hasLinkedIn?: boolean | undefined;
}, {
    name?: string | undefined;
    supplierId?: number | undefined;
    title?: string | undefined;
    email?: string | undefined;
    limit?: number | undefined;
    supplierName?: string | undefined;
    hasLinkedIn?: boolean | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodNumber;
    contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
    channel: import("zod").ZodString;
    summary: import("zod").ZodString;
    sentiment: import("zod").ZodEnum<["positive", "neutral", "negative"]>;
    occurredAt: import("zod").ZodOptional<import("zod").ZodString>;
    slackThreadId: import("zod").ZodOptional<import("zod").ZodString>;
    updateSupplierStatus: import("zod").ZodDefault<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    supplierId: number;
    channel: string;
    summary: string;
    sentiment: "positive" | "neutral" | "negative";
    updateSupplierStatus: boolean;
    contactId?: number | undefined;
    occurredAt?: string | undefined;
    slackThreadId?: string | undefined;
}, {
    supplierId: number;
    channel: string;
    summary: string;
    sentiment: "positive" | "neutral" | "negative";
    contactId?: number | undefined;
    occurredAt?: string | undefined;
    slackThreadId?: string | undefined;
    updateSupplierStatus?: boolean | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
    contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
    channel: import("zod").ZodOptional<import("zod").ZodString>;
    sentiment: import("zod").ZodOptional<import("zod").ZodString>;
    occurredAfter: import("zod").ZodOptional<import("zod").ZodString>;
    occurredBefore: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    includeAnalytics: import("zod").ZodDefault<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    includeAnalytics: boolean;
    supplierId?: number | undefined;
    contactId?: number | undefined;
    channel?: string | undefined;
    sentiment?: string | undefined;
    occurredAfter?: string | undefined;
    occurredBefore?: string | undefined;
}, {
    supplierId?: number | undefined;
    contactId?: number | undefined;
    channel?: string | undefined;
    sentiment?: string | undefined;
    limit?: number | undefined;
    occurredAfter?: string | undefined;
    occurredBefore?: string | undefined;
    includeAnalytics?: boolean | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
    contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
    days: import("zod").ZodDefault<import("zod").ZodNumber>;
    groupBy: import("zod").ZodDefault<import("zod").ZodEnum<["day", "week", "month"]>>;
}, "strip", import("zod").ZodTypeAny, {
    days: number;
    groupBy: "day" | "week" | "month";
    supplierId?: number | undefined;
    contactId?: number | undefined;
}, {
    supplierId?: number | undefined;
    contactId?: number | undefined;
    days?: number | undefined;
    groupBy?: "day" | "week" | "month" | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodNumber;
    body: import("zod").ZodString;
    authorId: import("zod").ZodDefault<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    supplierId: number;
    authorId: string;
    body: string;
}, {
    supplierId: number;
    body: string;
    authorId?: string | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    supplierId: import("zod").ZodNumber;
    searchText: import("zod").ZodOptional<import("zod").ZodString>;
    authorId: import("zod").ZodOptional<import("zod").ZodString>;
    createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
    createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    supplierId: number;
    limit: number;
    authorId?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
    searchText?: string | undefined;
}, {
    supplierId: number;
    authorId?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
    limit?: number | undefined;
    searchText?: string | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    searchText: import("zod").ZodString;
    authorId: import("zod").ZodOptional<import("zod").ZodString>;
    supplierName: import("zod").ZodOptional<import("zod").ZodString>;
    createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
    createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
}, "strip", import("zod").ZodTypeAny, {
    limit: number;
    searchText: string;
    authorId?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
    supplierName?: string | undefined;
}, {
    searchText: string;
    authorId?: string | undefined;
    createdAfter?: string | undefined;
    createdBefore?: string | undefined;
    limit?: number | undefined;
    supplierName?: string | undefined;
}>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
    action: import("zod").ZodEnum<["update", "delete"]>;
    noteId: import("zod").ZodNumber;
    body: import("zod").ZodOptional<import("zod").ZodString>;
    reason: import("zod").ZodOptional<import("zod").ZodString>;
}, "strip", import("zod").ZodTypeAny, {
    action: "update" | "delete";
    noteId: number;
    body?: string | undefined;
    reason?: string | undefined;
}, {
    action: "update" | "delete";
    noteId: number;
    body?: string | undefined;
    reason?: string | undefined;
}>>)[];
export declare const toolCategories: {
    supplier: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
        domain: import("zod").ZodOptional<import("zod").ZodString>;
        includeDays: import("zod").ZodDefault<import("zod").ZodNumber>;
        includeNotes: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        includeDays: number;
        includeNotes: boolean;
        domain?: string | undefined;
        supplierId?: number | undefined;
    }, {
        domain?: string | undefined;
        supplierId?: number | undefined;
        includeDays?: number | undefined;
        includeNotes?: boolean | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        domain: import("zod").ZodOptional<import("zod").ZodString>;
        status: import("zod").ZodOptional<import("zod").ZodString>;
        tier: import("zod").ZodOptional<import("zod").ZodString>;
        createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
        createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        name?: string | undefined;
        domain?: string | undefined;
        status?: string | undefined;
        tier?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
    }, {
        name?: string | undefined;
        domain?: string | undefined;
        status?: string | undefined;
        tier?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
        limit?: number | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodNumber;
        status: import("zod").ZodOptional<import("zod").ZodString>;
        tier: import("zod").ZodOptional<import("zod").ZodString>;
        reason: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        supplierId: number;
        status?: string | undefined;
        tier?: string | undefined;
        reason?: string | undefined;
    }, {
        supplierId: number;
        status?: string | undefined;
        tier?: string | undefined;
        reason?: string | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        name: import("zod").ZodString;
        domain: import("zod").ZodString;
        status: import("zod").ZodDefault<import("zod").ZodString>;
        tier: import("zod").ZodDefault<import("zod").ZodString>;
        initialNote: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        name: string;
        domain: string;
        status: string;
        tier: string;
        initialNote?: string | undefined;
    }, {
        name: string;
        domain: string;
        status?: string | undefined;
        tier?: string | undefined;
        initialNote?: string | undefined;
    }>>)[];
    contact: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        action: import("zod").ZodEnum<["create", "update", "get", "delete"]>;
        contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
        supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
        firstName: import("zod").ZodOptional<import("zod").ZodString>;
        lastName: import("zod").ZodOptional<import("zod").ZodString>;
        title: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodOptional<import("zod").ZodString>;
        phone: import("zod").ZodOptional<import("zod").ZodString>;
        linkedinUrl: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        action: "update" | "create" | "get" | "delete";
        supplierId?: number | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        linkedinUrl?: string | undefined;
        contactId?: number | undefined;
    }, {
        action: "update" | "create" | "get" | "delete";
        supplierId?: number | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        phone?: string | undefined;
        linkedinUrl?: string | undefined;
        contactId?: number | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        email: import("zod").ZodOptional<import("zod").ZodString>;
        title: import("zod").ZodOptional<import("zod").ZodString>;
        supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
        supplierName: import("zod").ZodOptional<import("zod").ZodString>;
        hasLinkedIn: import("zod").ZodOptional<import("zod").ZodBoolean>;
        limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        name?: string | undefined;
        supplierId?: number | undefined;
        title?: string | undefined;
        email?: string | undefined;
        supplierName?: string | undefined;
        hasLinkedIn?: boolean | undefined;
    }, {
        name?: string | undefined;
        supplierId?: number | undefined;
        title?: string | undefined;
        email?: string | undefined;
        limit?: number | undefined;
        supplierName?: string | undefined;
        hasLinkedIn?: boolean | undefined;
    }>>)[];
    interaction: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodNumber;
        contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
        channel: import("zod").ZodString;
        summary: import("zod").ZodString;
        sentiment: import("zod").ZodEnum<["positive", "neutral", "negative"]>;
        occurredAt: import("zod").ZodOptional<import("zod").ZodString>;
        slackThreadId: import("zod").ZodOptional<import("zod").ZodString>;
        updateSupplierStatus: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        supplierId: number;
        channel: string;
        summary: string;
        sentiment: "positive" | "neutral" | "negative";
        updateSupplierStatus: boolean;
        contactId?: number | undefined;
        occurredAt?: string | undefined;
        slackThreadId?: string | undefined;
    }, {
        supplierId: number;
        channel: string;
        summary: string;
        sentiment: "positive" | "neutral" | "negative";
        contactId?: number | undefined;
        occurredAt?: string | undefined;
        slackThreadId?: string | undefined;
        updateSupplierStatus?: boolean | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
        contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
        channel: import("zod").ZodOptional<import("zod").ZodString>;
        sentiment: import("zod").ZodOptional<import("zod").ZodString>;
        occurredAfter: import("zod").ZodOptional<import("zod").ZodString>;
        occurredBefore: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        includeAnalytics: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        includeAnalytics: boolean;
        supplierId?: number | undefined;
        contactId?: number | undefined;
        channel?: string | undefined;
        sentiment?: string | undefined;
        occurredAfter?: string | undefined;
        occurredBefore?: string | undefined;
    }, {
        supplierId?: number | undefined;
        contactId?: number | undefined;
        channel?: string | undefined;
        sentiment?: string | undefined;
        limit?: number | undefined;
        occurredAfter?: string | undefined;
        occurredBefore?: string | undefined;
        includeAnalytics?: boolean | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodOptional<import("zod").ZodNumber>;
        contactId: import("zod").ZodOptional<import("zod").ZodNumber>;
        days: import("zod").ZodDefault<import("zod").ZodNumber>;
        groupBy: import("zod").ZodDefault<import("zod").ZodEnum<["day", "week", "month"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        days: number;
        groupBy: "day" | "week" | "month";
        supplierId?: number | undefined;
        contactId?: number | undefined;
    }, {
        supplierId?: number | undefined;
        contactId?: number | undefined;
        days?: number | undefined;
        groupBy?: "day" | "week" | "month" | undefined;
    }>>)[];
    note: (import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodNumber;
        body: import("zod").ZodString;
        authorId: import("zod").ZodDefault<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        supplierId: number;
        authorId: string;
        body: string;
    }, {
        supplierId: number;
        body: string;
        authorId?: string | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        supplierId: import("zod").ZodNumber;
        searchText: import("zod").ZodOptional<import("zod").ZodString>;
        authorId: import("zod").ZodOptional<import("zod").ZodString>;
        createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
        createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        supplierId: number;
        limit: number;
        authorId?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
        searchText?: string | undefined;
    }, {
        supplierId: number;
        authorId?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
        limit?: number | undefined;
        searchText?: string | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        searchText: import("zod").ZodString;
        authorId: import("zod").ZodOptional<import("zod").ZodString>;
        supplierName: import("zod").ZodOptional<import("zod").ZodString>;
        createdAfter: import("zod").ZodOptional<import("zod").ZodString>;
        createdBefore: import("zod").ZodOptional<import("zod").ZodString>;
        limit: import("zod").ZodDefault<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        limit: number;
        searchText: string;
        authorId?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
        supplierName?: string | undefined;
    }, {
        searchText: string;
        authorId?: string | undefined;
        createdAfter?: string | undefined;
        createdBefore?: string | undefined;
        limit?: number | undefined;
        supplierName?: string | undefined;
    }>> | import("@langchain/core/tools").DynamicStructuredTool<import("zod").ZodObject<{
        action: import("zod").ZodEnum<["update", "delete"]>;
        noteId: import("zod").ZodNumber;
        body: import("zod").ZodOptional<import("zod").ZodString>;
        reason: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
        action: "update" | "delete";
        noteId: number;
        body?: string | undefined;
        reason?: string | undefined;
    }, {
        action: "update" | "delete";
        noteId: number;
        body?: string | undefined;
        reason?: string | undefined;
    }>>)[];
};
//# sourceMappingURL=index.d.ts.map
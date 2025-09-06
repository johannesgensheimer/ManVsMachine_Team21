import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
export declare const logInteractionTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodNumber;
    contactId: z.ZodOptional<z.ZodNumber>;
    channel: z.ZodString;
    summary: z.ZodString;
    sentiment: z.ZodEnum<["positive", "neutral", "negative"]>;
    occurredAt: z.ZodOptional<z.ZodString>;
    slackThreadId: z.ZodOptional<z.ZodString>;
    updateSupplierStatus: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const getInteractionHistoryTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodOptional<z.ZodNumber>;
    contactId: z.ZodOptional<z.ZodNumber>;
    channel: z.ZodOptional<z.ZodString>;
    sentiment: z.ZodOptional<z.ZodString>;
    occurredAfter: z.ZodOptional<z.ZodString>;
    occurredBefore: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    includeAnalytics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const analyzeSentimentTrendsTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodOptional<z.ZodNumber>;
    contactId: z.ZodOptional<z.ZodNumber>;
    days: z.ZodDefault<z.ZodNumber>;
    groupBy: z.ZodDefault<z.ZodEnum<["day", "week", "month"]>>;
}, "strip", z.ZodTypeAny, {
    days: number;
    groupBy: "day" | "week" | "month";
    supplierId?: number | undefined;
    contactId?: number | undefined;
}, {
    supplierId?: number | undefined;
    contactId?: number | undefined;
    days?: number | undefined;
    groupBy?: "day" | "week" | "month" | undefined;
}>>;
//# sourceMappingURL=interaction-tools.d.ts.map
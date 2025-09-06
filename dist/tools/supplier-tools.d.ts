import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
export declare const getSupplierOverviewTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodOptional<z.ZodNumber>;
    domain: z.ZodOptional<z.ZodString>;
    includeDays: z.ZodDefault<z.ZodNumber>;
    includeNotes: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    includeDays: number;
    includeNotes: boolean;
    domain?: string | undefined;
    supplierId?: number | undefined;
}, {
    domain?: string | undefined;
    supplierId?: number | undefined;
    includeDays?: number | undefined;
    includeNotes?: boolean | undefined;
}>>;
export declare const searchSuppliersTool: DynamicStructuredTool<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    tier: z.ZodOptional<z.ZodString>;
    createdAfter: z.ZodOptional<z.ZodString>;
    createdBefore: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const updateSupplierStatusTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodNumber;
    status: z.ZodOptional<z.ZodString>;
    tier: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    supplierId: number;
    status?: string | undefined;
    tier?: string | undefined;
    reason?: string | undefined;
}, {
    supplierId: number;
    status?: string | undefined;
    tier?: string | undefined;
    reason?: string | undefined;
}>>;
export declare const createSupplierTool: DynamicStructuredTool<z.ZodObject<{
    name: z.ZodString;
    domain: z.ZodString;
    status: z.ZodDefault<z.ZodString>;
    tier: z.ZodDefault<z.ZodString>;
    initialNote: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}>>;
//# sourceMappingURL=supplier-tools.d.ts.map
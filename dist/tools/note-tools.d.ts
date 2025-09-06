import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
export declare const addNoteTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodNumber;
    body: z.ZodString;
    authorId: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    supplierId: number;
    authorId: string;
    body: string;
}, {
    supplierId: number;
    body: string;
    authorId?: string | undefined;
}>>;
export declare const getNotesTool: DynamicStructuredTool<z.ZodObject<{
    supplierId: z.ZodNumber;
    searchText: z.ZodOptional<z.ZodString>;
    authorId: z.ZodOptional<z.ZodString>;
    createdAfter: z.ZodOptional<z.ZodString>;
    createdBefore: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const searchNotesTool: DynamicStructuredTool<z.ZodObject<{
    searchText: z.ZodString;
    authorId: z.ZodOptional<z.ZodString>;
    supplierName: z.ZodOptional<z.ZodString>;
    createdAfter: z.ZodOptional<z.ZodString>;
    createdBefore: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const manageNoteTool: DynamicStructuredTool<z.ZodObject<{
    action: z.ZodEnum<["update", "delete"]>;
    noteId: z.ZodNumber;
    body: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    action: "update" | "delete";
    noteId: number;
    body?: string | undefined;
    reason?: string | undefined;
}, {
    action: "update" | "delete";
    noteId: number;
    body?: string | undefined;
    reason?: string | undefined;
}>>;
//# sourceMappingURL=note-tools.d.ts.map
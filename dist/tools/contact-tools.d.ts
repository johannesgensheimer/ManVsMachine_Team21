import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
export declare const manageContactTool: DynamicStructuredTool<z.ZodObject<{
    action: z.ZodEnum<["create", "update", "get", "delete"]>;
    contactId: z.ZodOptional<z.ZodNumber>;
    supplierId: z.ZodOptional<z.ZodNumber>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    linkedinUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}>>;
export declare const searchContactsTool: DynamicStructuredTool<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    supplierId: z.ZodOptional<z.ZodNumber>;
    supplierName: z.ZodOptional<z.ZodString>;
    hasLinkedIn: z.ZodOptional<z.ZodBoolean>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
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
}>>;
//# sourceMappingURL=contact-tools.d.ts.map
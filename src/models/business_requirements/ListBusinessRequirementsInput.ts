import z4 from "zod/v4";

export const ScopeEnumSchema = z4.enum(['all', 'open', 'closed', 'refinement_open', 'refinement_closed']);
export type ScopeEnum = z4.infer<typeof ScopeEnumSchema>;

export const ListBusinessRequirementsInputSchema = z4.object({
    scope: ScopeEnumSchema
});
export type ListBusinessRequirementsInput = z4.infer<typeof ListBusinessRequirementsInputSchema>;
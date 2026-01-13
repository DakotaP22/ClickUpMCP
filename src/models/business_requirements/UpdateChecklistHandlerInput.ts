import z4 from "zod/v4"

export const UpdateRefinementChecklistHandlerInputSchema = z4.object({
    checklistId: z4.string(),
    checkklistItemId: z4.string(),
    resolved: z4.boolean().optional().default(false),
});

export type UpdateRefinementChecklistHandlerInput = z4.infer<typeof UpdateRefinementChecklistHandlerInputSchema>;
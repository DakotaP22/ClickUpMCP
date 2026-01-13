import z4 from "zod/v4"

export const UpdateChecklistHandlerInputSchema = z4.object({
    checklistId: z4.string(),
    checklistItemId: z4.string(),
    resolved: z4.boolean().optional().default(false),
});

export type UpdateChecklistHandlerInput = z4.infer<typeof UpdateChecklistHandlerInputSchema>;
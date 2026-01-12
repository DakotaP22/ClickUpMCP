import z4 from "zod/v4";

export const ChecklistItemSchema = z4.object({
    id: z4.string(),
    name: z4.string(),
    resolved: z4.boolean()
});

export const CreateChecklistItemClickUpResponseSchema = z4.object({
    checklist: z4.object({
        id: z4.string(),
        items: z4.array(ChecklistItemSchema)
    })
});

export type ChecklistItem = z4.infer<typeof ChecklistItemSchema>;
export type CreateChecklistItemClickUpResponse = z4.infer<typeof CreateChecklistItemClickUpResponseSchema>;
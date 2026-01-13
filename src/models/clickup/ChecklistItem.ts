import z4 from "zod/v4";

export const ChecklistItemSchema = z4.object({
    id: z4.string(),
    name: z4.string(),
    resolved: z4.boolean()
});

export type ChecklistItem = z4.infer<typeof ChecklistItemSchema>;
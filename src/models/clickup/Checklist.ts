import z4 from "zod/v4";
import { ChecklistItemSchema } from "./ChecklistItem";

export const ChecklistSchema = z4.object({
    id: z4.string(),
    name: z4.string(),
    items: z4.array(ChecklistItemSchema)
});

export const CreateChecklistClickUpResponseSchema = z4.object({
    checklist: ChecklistSchema
});

export type Checklist = z4.infer<typeof ChecklistSchema>;
export type CreateChecklistClickUpResponse = z4.infer<typeof CreateChecklistClickUpResponseSchema>;
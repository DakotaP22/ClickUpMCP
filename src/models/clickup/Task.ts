import z4 from "zod/v4";
import { ChecklistSchema } from "./Checklist";

export const TaskSchema = z4.object({
    id: z4.string(),
    name: z4.string(),
    status: z4.object({
        status: z4.string(),
        type: z4.string()
    }), 
    checklists: z4.array(ChecklistSchema)
});

export const TasksClickUpWrapperSchema = z4.object({
    tasks: TaskSchema.array()
});

export type Task = z4.infer<typeof TaskSchema>;
export type TasksClickUpWrapper = z4.infer<typeof TasksClickUpWrapperSchema>;
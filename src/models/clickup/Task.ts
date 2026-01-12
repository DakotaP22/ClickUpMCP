import z4 from "zod/v4";

export const TaskSchema = z4.object({
    id: z4.string(),
    name: z4.string(),
    status: z4.object({
        status: z4.string(),
        type: z4.string()
    }), 
    checklists: z4.array(z4.object({
        id: z4.string(),
        name: z4.string(),
        items: z4.array(z4.object({
            id: z4.string(),
            name: z4.string(),
            resolved: z4.boolean()
        }))
    }))
});

export type Task = z4.infer<typeof TaskSchema>;
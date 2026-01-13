import z4 from "zod/v4";

export const UpdateTaskRequestSchema = z4.object({
    taskId: z4.string(),
    name: z4.string().optional(),
    description: z4.string().optional(),
    status: z4.string().optional(),
});

export type UpdateTaskRequest = z4.infer<typeof UpdateTaskRequestSchema>;
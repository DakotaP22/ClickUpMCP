import z4 from "zod/v4";

export const CreateBusinessRequirementOutputSchema = z4.object({
    taskId: z4.string(),
    taskUrl: z4.string()
});

export type CreateBusinessRequirementOutput = z4.infer<typeof CreateBusinessRequirementOutputSchema>;

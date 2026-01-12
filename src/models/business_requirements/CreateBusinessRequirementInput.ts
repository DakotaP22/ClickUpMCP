import z4 from "zod/v4";

export const CreateBusinessRequirementInputSchema = z4.object({
    name: z4.string(),
    description: z4.string(),
    acceptanceCriteria: z4.array(z4.string()).optional()
});

export type CreateBusinessRequirementInput = z4.infer<typeof CreateBusinessRequirementInputSchema>;

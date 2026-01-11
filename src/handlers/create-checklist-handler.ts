import { createChecklist } from "../clickup/checklist/create-checklist";

type CreateChecklistHandlerInput = {
    taskId: string,
    name: string
}

export const createChecklistHandler = 
    async ({ taskId, name }: CreateChecklistHandlerInput) => {
        const checklistId = await createChecklist(taskId, name);

        const output = { checklistId };
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
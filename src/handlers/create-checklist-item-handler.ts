import { createChecklistItem } from "../clickup/checklist/create-checklist-item";

type CreateChecklistItemHandlerInput = {
    checklistId: string,
    name: string
}

export const createChecklistItemHandler = 
    async ({ checklistId, name }: CreateChecklistItemHandlerInput) => {
        const checklistItemIds = await createChecklistItem(checklistId, name);

        const output = { ids: checklistItemIds };
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
import { UpdateChecklistHandlerInput } from "../../../models/business_requirements/UpdateChecklistHandlerInput";
import { EditChecklistItem } from "../client/checklist/edit-checklist-item";

export const UpdateChecklistHandler = 
    async (input: UpdateChecklistHandlerInput) => {
         
        const output = await EditChecklistItem(
            input.checklistId,
            input.checklistItemId,
            { resolved: input.resolved }
        );         
        
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
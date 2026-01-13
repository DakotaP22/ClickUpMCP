import { UpdateRefinementChecklistHandlerInput } from "../../models/business_requirements/UpdateChecklistHandlerInput";
import { EditChecklistItem } from "../clickup/checklist/edit-checklist-item";

export const UpdateRefinementChecklistHandler = 
    async (input: UpdateRefinementChecklistHandlerInput) => {
         
        const output = await EditChecklistItem(
            input.checklistId,
            input.checkklistItemId,
            { resolved: input.resolved }
        );         
        
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
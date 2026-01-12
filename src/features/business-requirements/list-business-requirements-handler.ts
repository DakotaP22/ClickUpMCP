import { GetTasks } from "../clickup/task/get-tasks";
import { getBusinessRequirementsListId } from "../../util/env-getters";

type ListBusinessRequirementsHandlerInput = {
}

export const ListBusinessRequirementsHandler = 
    async (input: ListBusinessRequirementsHandlerInput) => {
        const requirements_list_id = getBusinessRequirementsListId();

        const output = await GetTasks(requirements_list_id);
                 
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
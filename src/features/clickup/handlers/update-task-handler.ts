import { UpdateTaskRequest } from "../../../models/clickup/requests/UpdateTaskRequest";
import { UpdateTask } from "../client/task/update-task";

export const UpdateTaskHandler = 
    async (input: UpdateTaskRequest) => {

        let updates = {};
        if(input.name && input.name.trim() !== "") {
            updates = { ...updates, name: input.name };
        }
        if(input.description && input.description.trim() !== "") {
            updates = { ...updates, description: input.description };
        }
        if(input.status && input.status.trim() !== "") {
            updates = { ...updates, status: input.status };
        }
         
        const output = await UpdateTask(
            input.taskId,
            {
                name: input.name,
                description: input.description,
                status: input.status
            }
        );
        
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
import { TasksClickUpWrapper, TasksClickUpWrapperSchema } from "../../../models/clickup/Task";

export const  GetTasks = async (list_id: string): Promise<TasksClickUpWrapper> => {
    const endpoint = `https://api.clickup.com/api/v2/list/${list_id}/task`;
    
    const apiToken = process.env.CLICKUP_API_KEY;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': apiToken!,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    
    try {
        const res = await fetch(endpoint, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
            return TasksClickUpWrapperSchema.parse(data);
    } catch (err) {
        console.error(JSON.stringify({ error: 'Failed to get tasks', details: err }));
        throw err;
    }
};

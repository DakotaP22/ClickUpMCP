export type CreateTaskResponse = {
    task_id: string;
}

export const CreateTask = async (list_id: string, task: {
    name: string;
    description: string;
}): Promise<string> => {
    const endpoint = `https://api.clickup.com/api/v2/list/${list_id}/task`;

    const apiToken = process.env.CLICKUP_API_KEY;
    const options = {
        method: 'POST',
        headers: {
            'Authorization': apiToken!,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: task.name,
            description: task.description
        })
    }

    try {
        const res = await fetch(endpoint, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json() as CreateTaskResponse;
        return data.task_id;
    } catch (err) {
        console.error(JSON.stringify({ error: "Failed to create task", details: err }));
        throw err;
    }
};
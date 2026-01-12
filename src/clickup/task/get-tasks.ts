import z4 from "zod/v4";

export const GetTasksOutputSchema = z4.object({
    tasks: z4.array(z4.object({
        id: z4.string(),
        name: z4.string(),
        status: z4.object({
            status: z4.string(),
            type: z4.string()
        }), 
        checklists: z4.array(z4.object({
            id: z4.string(),
            name: z4.string(),
            items: z4.array(z4.object({
                id: z4.string(),
                name: z4.string(),
                resolved: z4.boolean()
            }))
        }))
    }))
});

export type GetTasksResponse = z4.infer<typeof GetTasksOutputSchema>;

export const GetTasks = async (list_id: string): Promise<GetTasksResponse> => {
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
        const rawData = await res.json();
        const data = GetTasksOutputSchema.parse(rawData);
        return data;
    } catch (err) {
        console.error(JSON.stringify({ error: 'Failed to get tasks', details: err }));
        throw err;
    }
};

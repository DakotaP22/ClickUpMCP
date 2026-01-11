export type CreateChecklistItemResponse = {
    checklist: { 
        id: string;
        items: { id: string }[]
    }
}

export const createChecklistItem = async (checklistId: string, name: string): Promise<CreateChecklistItemResponse> => {
    const apiToken = process.env.CLICKUP_API_KEY;

    const options = {
        method: 'POST',
        headers: { 
            accept: 'application/json', 
            'content-type': 'application/json',
            'Authorization': apiToken!
         },
        body: JSON.stringify({ name })
    };

    try {
        const res = await fetch(`https://api.clickup.com/api/v2/checklist/${checklistId}/checklist_item`, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json() as CreateChecklistItemResponse;
        return data;
    } catch (err) {
        console.error(JSON.stringify({ error: "Failed to create checklist item", details: err }));
        throw err;
    }
}
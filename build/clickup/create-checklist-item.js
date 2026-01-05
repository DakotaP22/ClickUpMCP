"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklistItem = void 0;
const createChecklistItem = async (checklistId, name) => {
    const apiToken = process.env.CLICKUP_API_KEY;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'Authorization': apiToken
        },
        body: JSON.stringify({ name })
    };
    try {
        const res = await fetch(`https://api.clickup.com/api/v2/checklist/${checklistId}/checklist_item`, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data.items.map(item => item.id);
    }
    catch (err) {
        console.error('Failed to create checklist item:', err);
        throw err;
    }
};
exports.createChecklistItem = createChecklistItem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklistItem = void 0;
const ChecklistItem_1 = require("../../../models/clickup/ChecklistItem");
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
        console.error(JSON.stringify({ debug: "Raw API response", data }));
        return ChecklistItem_1.CreateChecklistItemClickUpResponseSchema.parse(data);
    }
    catch (err) {
        console.error(JSON.stringify({ error: "Failed to create checklist item", details: err }));
        throw err;
    }
};
exports.createChecklistItem = createChecklistItem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditChecklistItem = void 0;
const Checklist_1 = require("../../../models/clickup/Checklist");
const EditChecklistItem = async (checklist_id, checklist_item_id, updates) => {
    const endpoint = `https://api.clickup.com/api/v2/checklist/${checklist_id}/checklist_item/${checklist_item_id}`;
    const apiToken = process.env.CLICKUP_API_KEY;
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': apiToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...updates
        })
    };
    try {
        const res = await fetch(endpoint, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return Checklist_1.ChecklistClickUpWrapperSchema.parse(data);
    }
    catch (err) {
        console.error(JSON.stringify({ error: 'Failed to edit checklist item', details: err }));
        throw err;
    }
};
exports.EditChecklistItem = EditChecklistItem;

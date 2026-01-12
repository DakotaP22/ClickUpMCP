"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklist = void 0;
const createChecklist = async (taskId, name) => {
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
        const res = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/checklist`, options);
        if (!res.ok) {
            throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(JSON.stringify({ error: "Failed to create checklist", details: err }));
        throw err;
    }
};
exports.createChecklist = createChecklist;

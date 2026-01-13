"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
const Task_1 = require("../../../../models/clickup/Task");
const UpdateTask = async (task_id, updates) => {
    const endpoint = `https://api.clickup.com/api/v2/task/${task_id}`;
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
        return Task_1.TaskSchema.parse(data);
    }
    catch (err) {
        console.error(JSON.stringify({ error: 'Failed to create task', details: err }));
        throw err;
    }
};
exports.UpdateTask = UpdateTask;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTasks = exports.GetTasksOutputSchema = void 0;
const v4_1 = __importDefault(require("zod/v4"));
exports.GetTasksOutputSchema = v4_1.default.object({
    tasks: v4_1.default.array(v4_1.default.object({
        id: v4_1.default.string(),
        name: v4_1.default.string(),
        status: v4_1.default.object({
            status: v4_1.default.string(),
            type: v4_1.default.string()
        }),
        checklists: v4_1.default.array(v4_1.default.object({
            id: v4_1.default.string(),
            name: v4_1.default.string(),
            items: v4_1.default.array(v4_1.default.object({
                id: v4_1.default.string(),
                name: v4_1.default.string(),
                resolved: v4_1.default.boolean()
            }))
        }))
    }))
});
const GetTasks = async (list_id) => {
    const endpoint = `https://api.clickup.com/api/v2/list/${list_id}/task`;
    const apiToken = process.env.CLICKUP_API_KEY;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': apiToken,
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
        const data = exports.GetTasksOutputSchema.parse(rawData);
        return data;
    }
    catch (err) {
        console.error(JSON.stringify({ error: 'Failed to get tasks', details: err }));
        throw err;
    }
};
exports.GetTasks = GetTasks;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskHandler = void 0;
const update_task_1 = require("../client/task/update-task");
const UpdateTaskHandler = async (input) => {
    let updates = {};
    if (input.name && input.name.trim() !== "") {
        updates = { ...updates, name: input.name };
    }
    if (input.description && input.description.trim() !== "") {
        updates = { ...updates, description: input.description };
    }
    if (input.status && input.status.trim() !== "") {
        updates = { ...updates, status: input.status };
    }
    const output = await (0, update_task_1.UpdateTask)(input.taskId, {
        name: input.name,
        description: input.description,
        status: input.status
    });
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.UpdateTaskHandler = UpdateTaskHandler;

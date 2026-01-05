"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklistHandler = void 0;
const create_checklist_1 = require("../clickup/create-checklist");
const createChecklistHandler = async ({ taskId, name }) => {
    const checklistId = await (0, create_checklist_1.createChecklist)(taskId, name);
    const output = { checklistId };
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.createChecklistHandler = createChecklistHandler;

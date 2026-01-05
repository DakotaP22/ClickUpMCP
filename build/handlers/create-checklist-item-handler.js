"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChecklistItemHandler = void 0;
const create_checklist_item_1 = require("../clickup/create-checklist-item");
const createChecklistItemHandler = async ({ checklistId, name }) => {
    const checklistItemIds = await (0, create_checklist_item_1.createChecklistItem)(checklistId, name);
    const output = { ids: checklistItemIds };
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.createChecklistItemHandler = createChecklistItemHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChecklistHandler = void 0;
const edit_checklist_item_1 = require("../client/checklist/edit-checklist-item");
const UpdateChecklistHandler = async (input) => {
    const output = await (0, edit_checklist_item_1.EditChecklistItem)(input.checklistId, input.checklistItemId, { resolved: input.resolved });
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.UpdateChecklistHandler = UpdateChecklistHandler;

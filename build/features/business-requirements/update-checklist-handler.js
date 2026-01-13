"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefinementChecklistHandler = void 0;
const edit_checklist_item_1 = require("../clickup/checklist/edit-checklist-item");
const UpdateRefinementChecklistHandler = async (input) => {
    const output = await (0, edit_checklist_item_1.EditChecklistItem)(input.checklistId, input.checkklistItemId, { resolved: input.resolved });
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.UpdateRefinementChecklistHandler = UpdateRefinementChecklistHandler;

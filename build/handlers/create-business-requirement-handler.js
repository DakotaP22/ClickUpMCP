"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBusinessRequirementHandler = void 0;
const create_checklist_1 = require("../clickup/checklist/create-checklist");
const create_checklist_item_1 = require("../clickup/checklist/create-checklist-item");
const create_task_1 = require("../clickup/task/create-task");
const env_getters_1 = require("../util/env-getters");
const CreateBusinessRequirementHandler = async (input) => {
    const requirements_list_id = (0, env_getters_1.getBusinessRequirementsListId)();
    const task_id = await (0, create_task_1.CreateTask)(requirements_list_id, {
        name: input.name,
        description: input.description
    });
    const refinement_checklistId = await (0, create_checklist_1.createChecklist)(task_id, "Refinement Criteria");
    await Promise.all([
        (0, create_checklist_item_1.createChecklistItem)(refinement_checklistId, "Clear and concise description of the requirement"),
        (0, create_checklist_item_1.createChecklistItem)(refinement_checklistId, "Acceptance criteria defined"),
        (0, create_checklist_item_1.createChecklistItem)(refinement_checklistId, "Dependencies identified"),
        (0, create_checklist_item_1.createChecklistItem)(refinement_checklistId, "Requirement is atomic and testable"),
    ]);
    if (input.acceptanceCriteria && input.acceptanceCriteria.length > 0) {
        const acceptanceCriteria_checklistId = await (0, create_checklist_1.createChecklist)(task_id, "Acceptance Criteria");
        await Promise.all(input.acceptanceCriteria.map(criteria => (0, create_checklist_item_1.createChecklistItem)(acceptanceCriteria_checklistId, criteria)));
    }
    const output = {
        taskId: task_id,
        taskUrl: `https://app.clickup.com/t/${task_id}`
    };
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.CreateBusinessRequirementHandler = CreateBusinessRequirementHandler;

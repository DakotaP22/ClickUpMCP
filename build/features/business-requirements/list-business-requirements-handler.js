"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBusinessRequirementsHandler = void 0;
const get_tasks_1 = require("../clickup/client/task/get-tasks");
const env_getters_1 = require("../../util/env-getters");
const ListBusinessRequirementsHandler = async (input) => {
    const requirements_list_id = (0, env_getters_1.getBusinessRequirementsListId)();
    const { tasks } = await (0, get_tasks_1.GetTasks)(requirements_list_id);
    const filtered = filterByScope(tasks, input.scope);
    const output = { tasks: filtered };
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.ListBusinessRequirementsHandler = ListBusinessRequirementsHandler;
const filterByScope = (tasks, scope) => {
    switch (scope) {
        case 'all':
            return tasks;
        case 'open':
            return tasks.filter(isOpen);
        case 'closed':
            return tasks.filter(isClosed);
        case 'refinement_open':
            return tasks.filter(isRefinementOpen);
        case 'refinement_closed':
            return tasks.filter(isRefinementClosed);
        default:
            console.warn(`Unknown scope "${scope}", returning all tasks`);
            return tasks;
    }
};
const isOpen = (task) => task.status.type === 'open';
const isClosed = (task) => task.status.type === 'closed';
const isRefinementOpen = (task) => task.checklists.find(cl => cl.name === 'Refinement Criteria')?.items.every(item => !item.resolved);
const isRefinementClosed = (task) => task.checklists.find(cl => cl.name === 'Refinement Criteria')?.items.every(item => item.resolved);

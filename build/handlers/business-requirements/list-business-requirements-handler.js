"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBusinessRequirementsHandler = void 0;
const get_tasks_1 = require("../../clickup/task/get-tasks");
const env_getters_1 = require("../../util/env-getters");
const ListBusinessRequirementsHandler = async (input) => {
    const requirements_list_id = (0, env_getters_1.getBusinessRequirementsListId)();
    const output = await (0, get_tasks_1.GetTasks)(requirements_list_id);
    return {
        content: [{ type: 'text', text: JSON.stringify(output) }],
        structuredContent: output
    };
};
exports.ListBusinessRequirementsHandler = ListBusinessRequirementsHandler;

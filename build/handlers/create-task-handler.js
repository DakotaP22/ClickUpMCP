"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskHandler = void 0;
const createTaskHandler = async (title, description) => {
    const apiToken = process.env.CLICKUP_API_KEY;
    console.log(`Creating ClickUp task: ${title} - ${description || 'No description'}`);
};
exports.createTaskHandler = createTaskHandler;

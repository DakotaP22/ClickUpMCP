"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const create_business_requirement_handler_1 = require("../features/business-requirements/create-business-requirement-handler");
const list_business_requirements_handler_1 = require("../features/business-requirements/list-business-requirements-handler");
const update_checklist_handler_1 = require("../features/clickup/handlers/update-checklist-handler");
const CreateBusinessRequirementInput_1 = require("../models/business_requirements/CreateBusinessRequirementInput");
const CreateBusinessRequirementOutput_1 = require("../models/business_requirements/CreateBusinessRequirementOutput");
const ListBusinessRequirementsInput_1 = require("../models/business_requirements/ListBusinessRequirementsInput");
const UpdateChecklistHandlerInput_1 = require("../models/business_requirements/UpdateChecklistHandlerInput");
const Task_1 = require("../models/clickup/Task");
const Checklist_1 = require("../models/clickup/Checklist");
const MCP_API_DETAILS = {
    name: "ClickUp MCP",
    description: "ClickUp Model Context Protocol Server",
    version: "0.1.0",
};
const MCP_API_OPTS = {
    capabilities: {}
};
const createServer = () => {
    const server = new mcp_js_1.McpServer(MCP_API_DETAILS, MCP_API_OPTS);
    server.registerTool('clickup-business-requirement-create', {
        title: 'Create ClickUp Business Requirement',
        description: 'Create a new business requirement task in ClickUp with refinement and acceptance criteria checklists',
        inputSchema: CreateBusinessRequirementInput_1.CreateBusinessRequirementInputSchema,
        outputSchema: CreateBusinessRequirementOutput_1.CreateBusinessRequirementOutputSchema
    }, create_business_requirement_handler_1.CreateBusinessRequirementHandler);
    server.registerTool('clickup-business-requirements-list', {
        title: 'List Business Requirements',
        description: 'List all business requirement tasks from ClickUp',
        inputSchema: ListBusinessRequirementsInput_1.ListBusinessRequirementsInputSchema,
        outputSchema: Task_1.TasksClickUpWrapperSchema
    }, list_business_requirements_handler_1.ListBusinessRequirementsHandler);
    server.registerTool('clickup-general-update-checklist-item', {
        title: 'Updates Checklist Item Status',
        description: 'Update the status of a checklist item for a checklist in ClickUp',
        inputSchema: UpdateChecklistHandlerInput_1.UpdateChecklistHandlerInputSchema,
        outputSchema: Checklist_1.ChecklistClickUpWrapperSchema
    }, update_checklist_handler_1.UpdateChecklistHandler);
    return server;
};
exports.createServer = createServer;

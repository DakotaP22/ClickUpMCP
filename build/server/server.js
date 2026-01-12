"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const v4_1 = __importDefault(require("zod/v4"));
const create_business_requirement_handler_1 = require("../handlers/business-requirements/create-business-requirement-handler");
const get_tasks_1 = require("../clickup/task/get-tasks");
const list_business_requirements_handler_1 = require("../handlers/business-requirements/list-business-requirements-handler");
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
        inputSchema: {
            name: v4_1.default.string(),
            description: v4_1.default.string(),
            acceptanceCriteria: v4_1.default.array(v4_1.default.string()).optional()
        },
        outputSchema: {
            taskId: v4_1.default.string(),
            taskUrl: v4_1.default.string()
        }
    }, create_business_requirement_handler_1.CreateBusinessRequirementHandler);
    server.registerTool('clickup-business-requirements-list', {
        title: 'List Business Requirements',
        description: 'List all business requirement tasks from ClickUp',
        outputSchema: get_tasks_1.GetTasksOutputSchema
    }, list_business_requirements_handler_1.ListBusinessRequirementsHandler);
    return server;
};
exports.createServer = createServer;

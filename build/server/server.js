"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const v4_1 = __importDefault(require("zod/v4"));
const create_checklist_handler_1 = require("../handlers/create-checklist-handler");
const create_checklist_item_handler_1 = require("../handlers/create-checklist-item-handler");
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
    server.registerTool('clickup-checklist-create', {
        title: 'Create ClickUp Task Checklist',
        description: 'Create a new checklist in a given ClickUp task',
        inputSchema: {
            taskId: v4_1.default.string(),
            name: v4_1.default.string()
        },
        outputSchema: {
            checklistId: v4_1.default.string()
        }
    }, create_checklist_handler_1.createChecklistHandler);
    server.registerTool('clickup-checklist-item-create', {
        title: 'Create ClickUp Task Checklist Item',
        description: 'Create a new checklist item in a given ClickUp checklist',
        inputSchema: {
            checklistId: v4_1.default.string(),
            name: v4_1.default.string()
        },
        outputSchema: {
            checklistId: v4_1.default.string()
        }
    }, create_checklist_item_handler_1.createChecklistItemHandler);
    return server;
};
exports.createServer = createServer;

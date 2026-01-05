import { ServerOptions } from "@modelcontextprotocol/sdk/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z4 from "zod/v4";
import { createChecklist, CreateChecklistResponse } from "../clickup/create-checklist";
import { createChecklistHandler } from "../handlers/create-checklist-handler";
import { createChecklistItemHandler } from "../handlers/create-checklist-item-handler";

const MCP_API_DETAILS = {
    name: "ClickUp MCP",
    description: "ClickUp Model Context Protocol Server",
    version: "0.1.0",
}

const MCP_API_OPTS: ServerOptions = {
    capabilities: {}
}

export const createServer = () => {
    const server = new McpServer(MCP_API_DETAILS, MCP_API_OPTS);

    server.registerTool(
        'clickup-checklist-create',
        {
            title: 'Create ClickUp Task Checklist',
            description: 'Create a new checklist in a given ClickUp task',
            inputSchema: {
                taskId: z4.string(),
                name: z4.string()
            },
            outputSchema: {
                checklistId: z4.string()
            }
        },
        createChecklistHandler
    )

    server.registerTool(
        'clickup-checklist-item-create',
        {
            title: 'Create ClickUp Task Checklist Item',
            description: 'Create a new checklist item in a given ClickUp checklist',
            inputSchema: {
                checklistId: z4.string(),
                name: z4.string()
            },
            outputSchema: {
                checklistId: z4.string()
            }
        },
        createChecklistItemHandler
    )

    return server;
}
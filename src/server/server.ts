import { ServerOptions } from "@modelcontextprotocol/sdk/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z4 from "zod/v4";
import { CreateBusinessRequirementHandler } from "../features/business-requirements/create-business-requirement-handler";
import { GetTasks, GetTasksResponse, GetTasksOutputSchema } from "../features/clickup/task/get-tasks";
import { ListBusinessRequirementsHandler } from "../features/business-requirements/list-business-requirements-handler";

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
        'clickup-business-requirement-create',
        {
            title: 'Create ClickUp Business Requirement',
            description: 'Create a new business requirement task in ClickUp with refinement and acceptance criteria checklists',
            inputSchema: {
                name: z4.string(),
                description: z4.string(),
                acceptanceCriteria: z4.array(z4.string()).optional()
            },
            outputSchema: {
                taskId: z4.string(),
                taskUrl: z4.string()
            }
        },
        CreateBusinessRequirementHandler
    );

    server.registerTool(
        'clickup-business-requirements-list',
        {
            title: 'List Business Requirements',
            description: 'List all business requirement tasks from ClickUp',
            outputSchema: GetTasksOutputSchema
        },
        ListBusinessRequirementsHandler
    );


    return server;
}
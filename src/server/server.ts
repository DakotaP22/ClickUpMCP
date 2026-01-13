import { ServerOptions } from "@modelcontextprotocol/sdk/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateBusinessRequirementHandler } from "../features/business-requirements/create-business-requirement-handler";
import { ListBusinessRequirementsHandler } from "../features/business-requirements/list-business-requirements-handler";
import { UpdateChecklistHandler } from "../features/clickup/handlers/update-checklist-handler";
import { CreateBusinessRequirementInputSchema } from "../models/business_requirements/CreateBusinessRequirementInput";
import { CreateBusinessRequirementOutputSchema } from "../models/business_requirements/CreateBusinessRequirementOutput";
import { ListBusinessRequirementsInputSchema } from "../models/business_requirements/ListBusinessRequirementsInput";
import { UpdateChecklistHandlerInputSchema } from "../models/business_requirements/UpdateChecklistHandlerInput";
import { TaskSchema, TasksClickUpWrapperSchema } from "../models/clickup/Task";
import { ChecklistClickUpWrapperSchema } from "../models/clickup/Checklist";
import { UpdateTaskRequestSchema } from "../models/clickup/requests/UpdateTaskRequest";
import { UpdateTaskHandler } from "../features/clickup/handlers/update-task-handler";

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

    //#region Business Requirement Tools
    server.registerTool(
        'clickup-business-requirement-create',
        {
            title: 'Create ClickUp Business Requirement',
            description: 'Create a new business requirement task in ClickUp with refinement and acceptance criteria checklists',
            inputSchema: CreateBusinessRequirementInputSchema,
            outputSchema: CreateBusinessRequirementOutputSchema
        },
        CreateBusinessRequirementHandler
    );

    server.registerTool(
        'clickup-business-requirements-list',
        {
            title: 'List Business Requirements',
            description: 'List all business requirement tasks from ClickUp',
            inputSchema: ListBusinessRequirementsInputSchema,
            outputSchema: TasksClickUpWrapperSchema
        },
        ListBusinessRequirementsHandler
    );
    //#endregion


    //#region General ClickUp Tools
    server.registerTool(
        'clickup-general-update-checklist-item',
        {
            title: 'Updates Checklist Item Status',
            description: 'Update the status of a checklist item for a checklist in ClickUp',
            inputSchema: UpdateChecklistHandlerInputSchema,
            outputSchema: ChecklistClickUpWrapperSchema
        },
        UpdateChecklistHandler
    );

    server.registerTool(
        'clickup-general-update-task',
        {
            title: 'Update ClickUp Task',
            description: 'Update the name, details, and/or status of a task in ClickUp',
            inputSchema: UpdateTaskRequestSchema,
            outputSchema: TaskSchema
        },
        UpdateTaskHandler
    )
    //#endregion


    return server;
}
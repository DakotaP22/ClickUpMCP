import { ServerOptions } from "@modelcontextprotocol/sdk/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CreateBusinessRequirementHandler } from "../features/business-requirements/create-business-requirement-handler";
import { ListBusinessRequirementsHandler } from "../features/business-requirements/list-business-requirements-handler";
import { UpdateRefinementChecklistHandler } from "../features/business-requirements/update-checklist-handler";
import { CreateBusinessRequirementInputSchema } from "../models/business_requirements/CreateBusinessRequirementInput";
import { CreateBusinessRequirementOutputSchema } from "../models/business_requirements/CreateBusinessRequirementOutput";
import { ListBusinessRequirementsInputSchema } from "../models/business_requirements/ListBusinessRequirementsInput";
import { UpdateRefinementChecklistHandlerInputSchema } from "../models/business_requirements/UpdateChecklistHandlerInput";
import { TasksClickUpWrapperSchema } from "../models/clickup/Task";
import { ChecklistClickUpWrapperSchema } from "../models/clickup/Checklist";

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

    server.registerTool(
     'clickup-business-requirement-update-refinement-criteria-status',
     {
         title: 'Update Business Requirement\'s Refinement Criteria Status',
         description: 'Update the status of a refinement criteria checklist item for a business requirement in ClickUp',
         inputSchema: UpdateRefinementChecklistHandlerInputSchema,
         outputSchema: ChecklistClickUpWrapperSchema
     },
     UpdateRefinementChecklistHandler
    );


    return server;
}
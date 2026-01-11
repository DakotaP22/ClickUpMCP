export const getClickUpApiToken = () => {
    const apiToken = process.env.CLICKUP_API_TOKEN;
    if(!apiToken) {
        throw new Error("Missing CLICKUP_API_TOKEN environment variable");
    }
    return apiToken;
}

export const getFolderId = () => {
    const folderId = process.env.CLICKUP_PROJECT_FOLDER_ID;
    if(!folderId) {
        throw new Error("Missing CLICKUP_PROJECT_FOLDER_ID environment variable");
    }
    return folderId;
}

export const getBusinessRequirementsListId = () => {
    const listId = process.env.CLICKUP_BUSINESS_REQUIREMENTS_LIST_ID;
    if(!listId) {
        throw new Error("Missing CLICKUP_BUSINESS_REQUIREMENTS_LIST_ID environment variable");
    }
    return listId;
}

export const getTechnicalTasksListId = () => {
    const listId = process.env.CLICKUP_TECHNICAL_TASKS_LIST_ID;
    if(!listId) {
        throw new Error("Missing CLICKUP_TECHNICAL_TASKS_LIST_ID environment variable");
    }
    return listId;
}
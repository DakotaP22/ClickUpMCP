import { GetTasks } from "../clickup/task/get-tasks";
import { getBusinessRequirementsListId } from "../../util/env-getters";
import { ListBusinessRequirementsInput } from "../../models/business_requirements/ListBusinessRequirementsInput";
import { GetTasksClickUpResponse, Task } from "../../models/clickup/Task";

export const ListBusinessRequirementsHandler =
    async (input: ListBusinessRequirementsInput) => {
        const requirements_list_id = getBusinessRequirementsListId();

        const { tasks } = await GetTasks(requirements_list_id);
        const filtered: Task[] = filterByScope(tasks, input.scope);

        const output = { tasks: filtered } as GetTasksClickUpResponse;
        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }

const filterByScope = (tasks: Task[], scope: string) => {
    switch (scope) {
        case 'all':
            return tasks;
        case 'open':
            return tasks.filter(isOpen);
        case 'closed':
            return tasks.filter(isClosed);
        case 'refinement_open':
            return tasks.filter(isRefinementOpen);
        case 'refinement_closed':
            return tasks.filter(isRefinementClosed);
        default:
            console.warn(`Unknown scope "${scope}", returning all tasks`);
            return tasks;
    }
};

const isOpen = (task: Task) => task.status.type === 'open';
const isClosed = (task: Task) => task.status.type === 'closed';
const isRefinementOpen = (task: Task) => task.checklists.find(cl => cl.name === 'Refinement Criteria')?.items.every(item => !item.resolved);
const isRefinementClosed = (task: Task) => task.checklists.find(cl => cl.name === 'Refinement Criteria')?.items.every(item => item.resolved);


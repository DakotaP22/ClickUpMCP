import { createChecklist } from "../clickup/checklist/create-checklist";
import { createChecklistItem } from "../clickup/checklist/create-checklist-item";
import { CreateTask } from "../clickup/task/create-task";
import { getBusinessRequirementsListId, getFolderId } from "../util/env-getters";

type CreateBusinessRequirementHandlerInput = {
    name: string,
    description: string,
    acceptanceCriteria?: string[],
}

export const CreateBusinessRequirementHandler = 
    async (input: CreateBusinessRequirementHandlerInput) => {
        const requirements_list_id = getBusinessRequirementsListId();
        
        const { id: task_id } = await CreateTask(requirements_list_id, {
            name: input.name,
            description: input.description
        });

        const { id: refinement_checklistId } = await createChecklist(
            task_id,
            "Refinement Criteria",
        );        

        await Promise.all([
            createChecklistItem(refinement_checklistId, "Clear and concise description of the requirement"),
            createChecklistItem(refinement_checklistId, "Acceptance criteria defined"),
            createChecklistItem(refinement_checklistId, "Dependencies identified"),
            createChecklistItem(refinement_checklistId, "Requirement is atomic and testable"),
        ])

        if(input.acceptanceCriteria && input.acceptanceCriteria.length > 0) {
            const { id: acceptance_criteria_checklist_id} = await createChecklist(
                task_id,
                "Acceptance Criteria",
            );

            await Promise.all(input.acceptanceCriteria.map(criteria => 
                createChecklistItem(acceptance_criteria_checklist_id, criteria)
            ));
        }

        const output =  {
            taskId: task_id,
            taskUrl: `https://app.clickup.com/t/${task_id}`
        };

        return {
            content: [{ type: 'text' as const, text: JSON.stringify(output) }],
            structuredContent: output
        }
    }
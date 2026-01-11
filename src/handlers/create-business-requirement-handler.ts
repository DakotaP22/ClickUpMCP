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

        const refinement_checklist_response = await createChecklist(
            task_id,
            "Refinement Criteria",
        );    
        
        const refinement_checklist_id = refinement_checklist_response.checklist.id;

        await Promise.all([
            createChecklistItem(refinement_checklist_id, "Clear and concise description of the requirement"),
            createChecklistItem(refinement_checklist_id, "Acceptance criteria defined"),
            createChecklistItem(refinement_checklist_id, "Dependencies identified"),
            createChecklistItem(refinement_checklist_id, "Requirement is atomic and testable"),
        ])

        if(input.acceptanceCriteria && input.acceptanceCriteria.length > 0) {
            const acceptance_criteria_checklist_response = await createChecklist(
                task_id,
                "Acceptance Criteria",
            );

            const acceptance_criteria_checklist_id = acceptance_criteria_checklist_response.checklist.id;

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
import { ChecklistClickUpWrapper, ChecklistClickUpWrapperSchema } from "../../../models/clickup/Checklist";

export const EditChecklistItem = async (
    checklist_id: string,
    checklist_item_id: string,
    updates: { name?: string; resolved?: boolean }
): Promise<ChecklistClickUpWrapper> => {
          const endpoint = `https://api.clickup.com/api/v2/checklist/${checklist_id}/checklist_item/${checklist_item_id}`;
          
          const apiToken = process.env.CLICKUP_API_KEY;
          const options = {
              method: 'PUT',
              headers: {
                  'Authorization': apiToken!,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  ...updates
              })
          }
          
          try {
              const res = await fetch(endpoint, options);
              if (!res.ok) {
                  throw new Error(`ClickUp API error: ${res.status} ${res.statusText}`);
              }
              const data = await res.json();
              return ChecklistClickUpWrapperSchema.parse(data);
          } catch (err) {
              console.error(JSON.stringify({ error: 'Failed to edit checklist item', details: err }));
              throw err;
          }
};
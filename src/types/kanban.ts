export type KanbanColumn = 'todo' | 'in-progress' | 'done';

export interface KanbanTask {
  id: string;
  title: string;
  assigneeId?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  column: KanbanColumn;
}

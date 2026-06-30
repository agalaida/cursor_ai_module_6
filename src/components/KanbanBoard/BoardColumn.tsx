import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { KanbanColumn as KanbanColumnType, KanbanTask } from '../../types/kanban';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  column: KanbanColumnType;
  label: string;
  tasks: KanbanTask[];
  onDelete: (id: string) => void;
}

const columnColors: Record<KanbanColumnType, string> = {
  'todo': 'border-t-gray-400',
  'in-progress': 'border-t-yellow-400',
  'done': 'border-t-green-500',
};

export function BoardColumn({ column, label, tasks, onDelete }: BoardColumnProps) {
  const { setNodeRef } = useDroppable({ id: column });

  return (
    <div className={`bg-gray-100 dark:bg-gray-800/50 rounded-xl border-t-4 ${columnColors[column]} p-4 flex flex-col gap-3 min-h-[300px]`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</h3>
        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full px-2 py-0.5">{tasks.length}</span>
      </div>
      <div ref={setNodeRef} className="flex flex-col gap-2 flex-1">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-gray-400 py-8">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

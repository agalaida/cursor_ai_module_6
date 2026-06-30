import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { KanbanTask } from '../../types/kanban';
import { Badge } from '../shared/Badge';

interface TaskCardProps {
  task: KanbanTask;
  onDelete: (id: string) => void;
}

const priorityVariant = { low: 'success', medium: 'warning', high: 'danger' } as const;

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-3 shadow-sm cursor-grab active:cursor-grabbing"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start gap-2">
        <div {...attributes} {...listeners} className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white break-words">{task.title}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge label={task.priority} variant={priorityVariant[task.priority]} />
            {task.dueDate && (
              <span className="text-xs text-gray-400">📅 {task.dueDate}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task ${task.title}`}
          className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

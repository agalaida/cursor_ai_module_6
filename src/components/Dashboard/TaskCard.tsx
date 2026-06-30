import type { Task } from '../../types/dashboard';
import { Badge } from '../shared/Badge';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityVariant = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const;

const priorityBorder = {
  low: 'border-l-green-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-red-500',
};

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-l-4 ${priorityBorder[task.priority]} rounded-lg p-4 flex items-start gap-3`}>
      <input
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.status === 'done'}
        onChange={() => onComplete(task.id)}
        aria-label={`Mark "${task.title}" as ${task.status === 'done' ? 'incomplete' : 'complete'}`}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={`task-${task.id}`}
          className={`block text-sm font-medium cursor-pointer ${task.status === 'done' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}
        >
          {task.title}
        </label>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge label={task.priority} variant={priorityVariant[task.priority]} />
          <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
          <span className="text-xs text-gray-400">@{task.assignee}</span>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task "${task.title}"`}
        className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

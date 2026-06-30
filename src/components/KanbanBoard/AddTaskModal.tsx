import { useState } from 'react';
import type { KanbanColumn, KanbanTask } from '../../types/kanban';
import { Button } from '../shared/Button';

interface AddTaskModalProps {
  onAdd: (task: Omit<KanbanTask, 'id'>) => void;
  onClose: () => void;
}

export function AddTaskModal({ onAdd, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<KanbanTask['priority']>('medium');
  const [column, setColumn] = useState<KanbanColumn>('todo');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority, column, dueDate: dueDate || undefined });
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add new task"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
            <input
              id="task-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as KanbanTask['priority'])}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="task-column" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Column</label>
              <select
                id="task-column"
                value={column}
                onChange={(e) => setColumn(e.target.value as KanbanColumn)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="task-due" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { Task, StatWidget as StatWidgetType } from '../../types/dashboard';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatWidget } from './StatWidget';
import { TaskCard } from './TaskCard';
import { Button } from '../shared/Button';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Design new landing page', priority: 'high', status: 'in-progress', dueDate: '2026-07-05', assignee: 'alice' },
  { id: '2', title: 'Fix auth bug in login flow', priority: 'high', status: 'todo', dueDate: '2026-07-02', assignee: 'bob' },
  { id: '3', title: 'Write unit tests for API', priority: 'medium', status: 'todo', dueDate: '2026-07-08', assignee: 'carol' },
  { id: '4', title: 'Update README documentation', priority: 'low', status: 'done', dueDate: '2026-06-30', assignee: 'alice' },
  { id: '5', title: 'Deploy staging environment', priority: 'medium', status: 'in-progress', dueDate: '2026-07-03', assignee: 'bob' },
];

const STATS: StatWidgetType[] = [
  { label: 'Total Tasks', value: 24, trend: 12, icon: '📋' },
  { label: 'Completed', value: 18, trend: 8, icon: '✅' },
  { label: 'In Progress', value: 4, trend: -2, icon: '🔄' },
  { label: 'Overdue', value: 2, trend: -5, icon: '⚠️' },
];

interface DashboardProps {
  isDark: boolean;
  onToggleDark: (checked: boolean) => void;
}

export function Dashboard({ isDark, onToggleDark }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  function handleComplete(id: string) {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t)
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: String(Date.now()),
      title: newTask.trim(),
      priority: 'medium',
      status: 'todo',
      dueDate: '2026-07-15',
      assignee: 'me',
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask('');
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDark={isDark} onToggleDark={onToggleDark} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STATS.map((s) => <StatWidget key={s.label} stat={s} />)}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks</h2>
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <label htmlFor="new-task" className="sr-only">New task title</label>
              <input
                id="new-task"
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="submit" size="sm">Add</Button>
            </form>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

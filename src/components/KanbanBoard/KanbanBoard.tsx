import { useState, useEffect } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { KanbanTask, KanbanColumn } from '../../types/kanban';
import { BoardColumn } from './BoardColumn';
import { AddTaskModal } from './AddTaskModal';
import { Button } from '../shared/Button';

const STORAGE_KEY = 'kanban-tasks';

const INITIAL_TASKS: KanbanTask[] = [
  { id: '1', title: 'Set up CI/CD pipeline', priority: 'high', column: 'todo', dueDate: '2026-07-10' },
  { id: '2', title: 'Write API documentation', priority: 'medium', column: 'todo' },
  { id: '3', title: 'Implement dark mode', priority: 'medium', column: 'in-progress', dueDate: '2026-07-05' },
  { id: '4', title: 'Fix login redirect bug', priority: 'high', column: 'in-progress' },
  { id: '5', title: 'Update dependencies', priority: 'low', column: 'done', dueDate: '2026-06-28' },
];

const COLUMNS: { id: KanbanColumn; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

function loadTasks(): KanbanTask[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>(loadTasks);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overId = String(over.id);
    const newColumn = COLUMNS.find((c) => c.id === overId)?.id ?? tasks.find((t) => t.id === overId)?.column;
    if (newColumn && newColumn !== activeTask.column) {
      setTasks((prev) => prev.map((t) => t.id === activeTask.id ? { ...t, column: newColumn } : t));
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  }

  function handleAdd(taskData: Omit<KanbanTask, 'id'>) {
    setTasks((prev) => [...prev, { ...taskData, id: String(Date.now()) }]);
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
          <Button onClick={() => setShowModal(true)}>+ Add Task</Button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLUMNS.map((col) => (
              <BoardColumn
                key={col.id}
                column={col.id}
                label={col.label}
                tasks={tasks.filter((t) => t.column === col.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </DndContext>
      </div>
      {showModal && <AddTaskModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}

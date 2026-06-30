export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  assignee: string;
}

export interface StatWidget {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}

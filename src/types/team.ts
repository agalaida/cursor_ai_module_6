export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  isOnline: boolean;
}

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'completed';
  dueDate: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  createdAt: string;
}

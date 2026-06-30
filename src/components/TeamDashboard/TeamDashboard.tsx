import { useState } from 'react';
import type { TeamMember, Project, Activity } from '../../types/team';
import { ProjectOverview } from './ProjectOverview';
import { TeamMembers } from './TeamMembers';
import { ProgressChart } from './ProgressChart';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';

const MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alice Johnson', role: 'Frontend Dev', avatarUrl: 'https://i.pravatar.cc/150?img=1', isOnline: true },
  { id: '2', name: 'Bob Martinez', role: 'Backend Dev', isOnline: false },
  { id: '3', name: 'Carol Smith', role: 'UX Designer', avatarUrl: 'https://i.pravatar.cc/150?img=5', isOnline: true },
  { id: '4', name: 'Dan Lee', role: 'DevOps', isOnline: true },
];

const PROJECTS: Project[] = [
  { id: '1', name: 'Design System v2', progress: 75, status: 'on-track', dueDate: '2026-07-15' },
  { id: '2', name: 'API Migration', progress: 40, status: 'at-risk', dueDate: '2026-07-01' },
  { id: '3', name: 'Mobile App', progress: 100, status: 'completed', dueDate: '2026-06-20' },
];

const INITIAL_ACTIVITIES: Activity[] = [
  { id: '1', userId: '1', userName: 'Alice', action: 'completed task', target: 'Hero redesign', createdAt: '2 min ago' },
  { id: '2', userId: '2', userName: 'Bob', action: 'opened PR for', target: 'Auth service', createdAt: '15 min ago' },
  { id: '3', userId: '3', userName: 'Carol', action: 'commented on', target: 'Design tokens', createdAt: '1h ago' },
  { id: '4', userId: '4', userName: 'Dan', action: 'deployed', target: 'staging environment', createdAt: '3h ago' },
];

export function TeamDashboard() {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  function handleTaskComplete() {
    const newActivity: Activity = {
      id: String(Date.now()),
      userId: '1',
      userName: 'You',
      action: 'completed task',
      target: 'New milestone',
      createdAt: 'just now',
    };
    setActivities((prev) => [newActivity, ...prev]);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Team Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex flex-col gap-4">
            <ProjectOverview projects={PROJECTS} />
            <ProgressChart />
          </div>
          <div className="flex flex-col gap-4">
            <QuickActions />
            <TeamMembers members={MEMBERS} />
          </div>
          <div className="md:col-span-3">
            <ActivityFeed activities={activities} />
          </div>
        </div>
        <button
          onClick={handleTaskComplete}
          className="mt-4 text-xs text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
        >
          Simulate task completion → update feed
        </button>
      </div>
    </div>
  );
}

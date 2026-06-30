import type { Activity } from '../../types/team';
import { Card } from '../shared/Card';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Activity</h3>
      <ol className="flex flex-col gap-3">
        {activities.map((a) => (
          <li key={a.id} className="flex gap-3 items-start">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{a.userName}</span>
                {' '}{a.action}{' '}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">{a.target}</span>
              </p>
              <time className="text-xs text-gray-400">{a.createdAt}</time>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

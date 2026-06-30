import type { Project } from '../../types/team';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';

interface ProjectOverviewProps {
  projects: Project[];
}

const statusVariant = { 'on-track': 'success', 'at-risk': 'warning', completed: 'info' } as const;

export function ProjectOverview({ projects }: ProjectOverviewProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Projects</h3>
      <div className="flex flex-col gap-4">
        {projects.map((p) => (
          <div key={p.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</span>
              <Badge label={p.status} variant={statusVariant[p.status]} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${p.progress}%` }}
                  role="progressbar"
                  aria-valuenow={p.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${p.name} progress`}
                />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">{p.progress}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Due {p.dueDate}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

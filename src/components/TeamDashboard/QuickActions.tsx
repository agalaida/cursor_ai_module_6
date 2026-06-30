import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

export function QuickActions() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        <Button variant="primary" size="sm" className="w-full justify-start">+ New Task</Button>
        <Button variant="secondary" size="sm" className="w-full justify-start">+ Invite Member</Button>
        <Button variant="secondary" size="sm" className="w-full justify-start">+ New Project</Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">📋 View Reports</Button>
      </div>
    </Card>
  );
}

import type { TeamMember } from '../../types/team';
import { Avatar } from '../shared/Avatar';
import { Card } from '../shared/Card';

interface TeamMembersProps {
  members: TeamMember[];
}

export function TeamMembers({ members }: TeamMembersProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Team Members</h3>
      <div className="flex flex-col gap-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={m.avatarUrl} name={m.name} size="sm" />
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${m.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                aria-label={m.isOnline ? 'Online' : 'Offline'}
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

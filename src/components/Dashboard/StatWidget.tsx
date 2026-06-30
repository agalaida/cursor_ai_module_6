import type { StatWidget as StatWidgetType } from '../../types/dashboard';
import { Card } from '../shared/Card';

interface StatWidgetProps {
  stat: StatWidgetType;
}

export function StatWidget({ stat }: StatWidgetProps) {
  const isPositive = stat.trend >= 0;

  return (
    <Card className="p-5 flex items-center gap-4">
      <div className="text-3xl" aria-hidden="true">{stat.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
      </div>
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(stat.trend)}%
      </span>
    </Card>
  );
}

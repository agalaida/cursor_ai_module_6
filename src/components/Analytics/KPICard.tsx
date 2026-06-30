import { Card } from '../shared/Card';

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  unit?: string;
}

export function KPICard({ title, value, trend, unit }: KPICardProps) {
  const positive = trend >= 0;
  return (
    <Card className="p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
        {unit && <span className="text-lg mr-0.5">{unit}</span>}
        {value}
      </p>
      <span className={`text-sm font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {positive ? '↑' : '↓'} {Math.abs(trend)}% vs last month
      </span>
    </Card>
  );
}

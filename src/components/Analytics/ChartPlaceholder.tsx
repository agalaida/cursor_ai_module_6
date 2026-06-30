import { Card } from '../shared/Card';

interface ChartPlaceholderProps {
  title: string;
  type?: 'bar' | 'line' | 'pie';
  height?: number;
}

const BAR_HEIGHTS = [40, 65, 50, 80, 60, 90, 70];
const LINE_POINTS = [30, 55, 40, 70, 50, 85, 65];

export function ChartPlaceholder({ title, type = 'bar', height = 160 }: ChartPlaceholderProps) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</h3>
      <div style={{ height }} className="flex items-end gap-2 relative">
        {type === 'bar' && BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-indigo-500 dark:bg-indigo-600 rounded-t opacity-80 hover:opacity-100 transition-opacity"
            style={{ height: `${h}%` }}
            aria-hidden="true"
          />
        ))}
        {type === 'line' && (
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points={LINE_POINTS.map((h, i) => `${(i / (LINE_POINTS.length - 1)) * 200},${100 - h}`).join(' ')}
              fill="none"
              stroke="rgb(99,102,241)"
              strokeWidth="2"
            />
            <polygon
              points={[
                ...LINE_POINTS.map((h, i) => `${(i / (LINE_POINTS.length - 1)) * 200},${100 - h}`),
                '200,100', '0,100'
              ].join(' ')}
              fill="rgba(99,102,241,0.1)"
            />
          </svg>
        )}
        {type === 'pie' && (
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 32 32" aria-hidden="true">
            <circle r="16" cx="16" cy="16" fill="#6366f1" />
            <circle r="8" cx="16" cy="16" fill="none" stroke="#e0e7ff" strokeWidth="16" strokeDasharray="20 100" transform="rotate(-90 16 16)" />
            <circle r="8" cx="16" cy="16" fill="none" stroke="#818cf8" strokeWidth="16" strokeDasharray="15 100" strokeDashoffset="-20" transform="rotate(-90 16 16)" />
          </svg>
        )}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
          <span key={m} className="flex-1 text-center">{m}</span>
        ))}
      </div>
    </Card>
  );
}

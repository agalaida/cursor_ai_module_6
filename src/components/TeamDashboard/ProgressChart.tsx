import { Card } from '../shared/Card';

const WEEKS = ['W1', 'W2', 'W3', 'W4'];
const SERIES = [
  { label: 'Completed', values: [4, 7, 5, 9], color: 'bg-indigo-500' },
  { label: 'In Review', values: [2, 3, 4, 2], color: 'bg-yellow-400' },
];

export function ProgressChart() {
  const max = Math.max(...SERIES.flatMap((s) => s.values));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Weekly Progress</h3>
      <div className="flex gap-4 h-32 items-end" aria-hidden="true">
        {WEEKS.map((week, wi) => (
          <div key={week} className="flex-1 flex gap-1 items-end">
            {SERIES.map((s) => (
              <div
                key={s.label}
                className={`flex-1 rounded-t ${s.color} opacity-80`}
                style={{ height: `${(s.values[wi] / max) * 100}%` }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {WEEKS.map((w) => <span key={w} className="flex-1 text-center text-xs text-gray-400">{w}</span>)}
      </div>
      <div className="flex gap-4 mt-2">
        {SERIES.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <div className={`w-3 h-3 rounded ${s.color}`} aria-hidden="true" />
            {s.label}
          </div>
        ))}
      </div>
    </Card>
  );
}

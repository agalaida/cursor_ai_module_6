import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';

interface Row {
  page: string;
  views: number;
  bounce: string;
  status: 'good' | 'average' | 'poor';
}

const DATA: Row[] = [
  { page: '/home', views: 12480, bounce: '32%', status: 'good' },
  { page: '/products', views: 8231, bounce: '45%', status: 'average' },
  { page: '/about', views: 3102, bounce: '58%', status: 'poor' },
  { page: '/blog', views: 5674, bounce: '38%', status: 'good' },
  { page: '/contact', views: 1893, bounce: '62%', status: 'poor' },
];

const statusVariant = { good: 'success', average: 'warning', poor: 'danger' } as const;

export function DataTable() {
  return (
    <Card className="overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Top Pages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Page</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Views</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bounce</th>
              <th className="text-center px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {DATA.map((row) => (
              <tr key={row.page} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-3 font-mono text-gray-900 dark:text-white">{row.page}</td>
                <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">{row.views.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-gray-700 dark:text-gray-300">{row.bounce}</td>
                <td className="px-5 py-3 text-center">
                  <Badge label={row.status} variant={statusVariant[row.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

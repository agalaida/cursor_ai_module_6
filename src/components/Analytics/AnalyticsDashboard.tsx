import { useState } from 'react';
import { KPICard } from './KPICard';
import { ChartPlaceholder } from './ChartPlaceholder';
import { DataTable } from './DataTable';
import { FilterBar } from './FilterBar';

const KPIS = [
  { title: 'Total Revenue', value: '48,290', trend: 12.5, unit: '$' },
  { title: 'Active Users', value: '9,314', trend: 8.2 },
  { title: 'Conversion Rate', value: '3.6%', trend: -1.4 },
  { title: 'Avg. Session', value: '4m 32s', trend: 5.1 },
];

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [category, setCategory] = useState('All categories');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your key metrics at a glance.</p>
          </div>
          <FilterBar
            dateRange={dateRange}
            category={category}
            onDateChange={setDateRange}
            onCategoryChange={setCategory}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {KPIS.map((k) => <KPICard key={k.title} {...k} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ChartPlaceholder title="Revenue over time" type="line" />
          <ChartPlaceholder title="Monthly active users" type="bar" />
        </div>

        <DataTable />
      </div>
    </div>
  );
}

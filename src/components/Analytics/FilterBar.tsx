interface FilterBarProps {
  dateRange: string;
  category: string;
  onDateChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

const DATE_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];
const CATEGORY_OPTIONS = ['All categories', 'Marketing', 'Engineering', 'Sales', 'Support'];

export function FilterBar({ dateRange, category, onDateChange, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div>
        <label htmlFor="date-range" className="sr-only">Date range</label>
        <select
          id="date-range"
          value={dateRange}
          onChange={(e) => onDateChange(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {DATE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="category" className="sr-only">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CATEGORY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

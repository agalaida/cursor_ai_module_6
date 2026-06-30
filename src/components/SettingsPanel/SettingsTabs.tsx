interface SettingsTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function SettingsTabs({ tabs, active, onChange }: SettingsTabsProps) {
  return (
    <nav aria-label="Settings tabs" className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            active === tab
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

import { useState } from 'react';

const MENU_ITEMS = [
  { label: 'Overview', icon: '📊' },
  { label: 'Tasks', icon: '✅' },
  { label: 'Calendar', icon: '📅' },
  { label: 'Reports', icon: '📈' },
  { label: 'Team', icon: '👥' },
];

export function Sidebar() {
  const [active, setActive] = useState('Overview');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-200 ${collapsed ? 'w-14' : 'w-56'} shrink-0`}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <span className="font-semibold text-sm">Dashboard</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            aria-current={active === item.label ? 'page' : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              active === item.label
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span aria-hidden="true">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

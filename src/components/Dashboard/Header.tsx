import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: (checked: boolean) => void;
}

export function Header({ isDark, onToggleDark }: HeaderProps) {
  return (
    <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shrink-0">
      <h1 className="text-base font-semibold text-gray-900 dark:text-white">Task Management</h1>
      <div className="flex items-center gap-4">
        <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
        <button
          aria-label="Notifications"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  );
}

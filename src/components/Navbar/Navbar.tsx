import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/navigation';
import { UserDropdown } from './UserDropdown';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS: NavItem[] = [
  { label: 'Profile', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Settings', path: '/settings' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Team', path: '/team' },
  { label: 'Kanban', path: '/kanban' },
  { label: 'Feed', path: '/feed' },
];

interface NavbarProps {
  onToggleDark: () => void;
  isDark: boolean;
}

export function Navbar({ onToggleDark, isDark }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 gap-4">
        <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg shrink-0">AppKit</span>

        <nav aria-label="Main navigation" className="hidden md:flex gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <label htmlFor="nav-search" className="sr-only">Search</label>
          <input
            id="nav-search"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:block px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44"
          />

          <button
            onClick={onToggleDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <UserDropdown name="Alice Johnson" avatarUrl="https://i.pravatar.cc/150?img=1" />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && <MobileMenu items={NAV_ITEMS} onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

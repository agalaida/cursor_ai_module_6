import { NavLink } from 'react-router-dom';
import type { NavItem } from '../../types/navigation';

interface MobileMenuProps {
  items: NavItem[];
  onClose: () => void;
}

export function MobileMenu({ items, onClose }: MobileMenuProps) {
  return (
    <nav aria-label="Mobile navigation" className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

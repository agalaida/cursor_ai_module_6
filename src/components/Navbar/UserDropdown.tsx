import { useState, useRef, useEffect } from 'react';
import { Avatar } from '../shared/Avatar';

interface UserDropdownProps {
  name: string;
  avatarUrl?: string;
}

export function UserDropdown({ name, avatarUrl }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <Avatar src={avatarUrl} name={name} size="sm" />
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">{name}</span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
          {['Profile', 'Settings', 'Help'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              {item}
            </button>
          ))}
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

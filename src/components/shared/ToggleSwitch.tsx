interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export function ToggleSwitch({ checked, onChange, label, id }: ToggleSwitchProps) {
  const switchId = id ?? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <label htmlFor={switchId} className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          id={switchId}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={label}
        />
        <div className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`} />
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
}

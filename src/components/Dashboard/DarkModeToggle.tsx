import { ToggleSwitch } from '../shared/ToggleSwitch';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: (checked: boolean) => void;
}

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return <ToggleSwitch checked={isDark} onChange={onToggle} label="Dark mode" />;
}

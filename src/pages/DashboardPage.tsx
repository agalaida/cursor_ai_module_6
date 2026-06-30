import { Dashboard } from '../components/Dashboard/Dashboard';

interface DashboardPageProps {
  isDark: boolean;
  onToggleDark: (checked: boolean) => void;
}

export function DashboardPage({ isDark, onToggleDark }: DashboardPageProps) {
  return <Dashboard isDark={isDark} onToggleDark={onToggleDark} />;
}

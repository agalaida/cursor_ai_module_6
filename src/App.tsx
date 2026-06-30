import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { UserProfilePage } from './pages/UserProfilePage';
import { ProductsPage } from './pages/ProductsPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TeamDashboardPage } from './pages/TeamDashboardPage';
import { KanbanPage } from './pages/KanbanPage';
import { FeedPage } from './pages/FeedPage';

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar isDark={dark} onToggleDark={() => setDark((d) => !d)} />
        <Routes>
          <Route path="/" element={<UserProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/dashboard" element={<DashboardPage isDark={dark} onToggleDark={(v) => setDark(v)} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/team" element={<TeamDashboardPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

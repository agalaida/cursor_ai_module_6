import { useState } from 'react';
import { SettingsTabs } from './SettingsTabs';
import { ToggleSwitch } from '../shared/ToggleSwitch';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

const TABS = ['Profile', 'Notifications', 'Privacy', 'Appearance'];

interface ProfileForm {
  name: string;
  email: string;
  bio: string;
}

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<ProfileForm>({ name: 'Alice Johnson', email: 'alice@example.com', bio: 'Frontend developer' });
  const [notifications, setNotifications] = useState({ email: true, push: false, sms: false });
  const [privacy, setPrivacy] = useState({ publicProfile: true, showEmail: false, allowTagging: true });
  const [appearance, setAppearance] = useState({ compactMode: false, animations: true });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your account preferences.</p>
        <SettingsTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {activeTab === 'Profile' && (
          <div className="flex flex-col gap-4" role="tabpanel" aria-label="Profile settings">
            {(['name', 'email', 'bio'] as const).map((field) => (
              <div key={field}>
                <label htmlFor={`profile-${field}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{field}</label>
                {field === 'bio' ? (
                  <textarea
                    id={`profile-${field}`}
                    value={profile[field]}
                    onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    id={`profile-${field}`}
                    type={field === 'email' ? 'email' : 'text'}
                    value={profile[field]}
                    onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="flex flex-col gap-4" role="tabpanel" aria-label="Notification settings">
            {(Object.keys(notifications) as (keyof typeof notifications)[]).map((key) => (
              <ToggleSwitch
                key={key}
                label={`${key.charAt(0).toUpperCase() + key.slice(1)} notifications`}
                checked={notifications[key]}
                onChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
              />
            ))}
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="flex flex-col gap-4" role="tabpanel" aria-label="Privacy settings">
            <ToggleSwitch label="Public profile" checked={privacy.publicProfile} onChange={(v) => setPrivacy((p) => ({ ...p, publicProfile: v }))} />
            <ToggleSwitch label="Show email address" checked={privacy.showEmail} onChange={(v) => setPrivacy((p) => ({ ...p, showEmail: v }))} />
            <ToggleSwitch label="Allow tagging in posts" checked={privacy.allowTagging} onChange={(v) => setPrivacy((p) => ({ ...p, allowTagging: v }))} />
          </div>
        )}

        {activeTab === 'Appearance' && (
          <div className="flex flex-col gap-4" role="tabpanel" aria-label="Appearance settings">
            <ToggleSwitch label="Compact mode" checked={appearance.compactMode} onChange={(v) => setAppearance((a) => ({ ...a, compactMode: v }))} />
            <ToggleSwitch label="Enable animations" checked={appearance.animations} onChange={(v) => setAppearance((a) => ({ ...a, animations: v }))} />
          </div>
        )}

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleSave} loading={false}>
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
          <Button variant="secondary" onClick={() => {}}>Cancel</Button>
        </div>
      </div>
    </Card>
  );
}

import { UserProfile } from '../components/UserProfile/UserProfile';
import type { User } from '../types/user';

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    bio: 'Frontend developer & open-source enthusiast. Building beautiful UIs.',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    followers: 1420,
    following: 312,
    posts: 87,
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Bob Martinez',
    bio: 'Full-stack engineer. Coffee addict. Loves TypeScript and clean code.',
    followers: 934,
    following: 210,
    posts: 45,
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Carol Smith',
    bio: 'UX designer turned developer. Passionate about accessible, human-centred products.',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    followers: 2871,
    following: 501,
    posts: 132,
    isFollowing: false,
  },
];

export function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        User Profiles
      </h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {SAMPLE_USERS.map((user) => (
          <UserProfile key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

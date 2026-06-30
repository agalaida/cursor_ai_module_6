import { useState } from 'react';
import type { User } from '../../types/user';
import { Avatar } from './Avatar';
import { StatItem } from './StatItem';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const [following, setFollowing] = useState(user.isFollowing);
  const [followerCount, setFollowerCount] = useState(user.followers);

  function handleFollow() {
    const next = !following;
    setFollowing(next);
    setFollowerCount((c) => c + (next ? 1 : -1));
  }

  return (
    <Card className="p-6 flex flex-col items-center gap-4 w-full max-w-sm">
      <Avatar src={user.avatarUrl} name={user.name} />
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.bio}</p>
      </div>
      <div className="flex gap-8 py-3 border-t border-b border-gray-200 dark:border-gray-700 w-full justify-center">
        <StatItem label="Posts" value={user.posts} />
        <StatItem label="Followers" value={followerCount} />
        <StatItem label="Following" value={user.following} />
      </div>
      <Button
        variant={following ? 'secondary' : 'primary'}
        onClick={handleFollow}
        aria-label={following ? `Unfollow ${user.name}` : `Follow ${user.name}`}
      >
        {following ? 'Unfollow' : 'Follow'}
      </Button>
    </Card>
  );
}

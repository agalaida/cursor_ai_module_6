export interface User {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
}

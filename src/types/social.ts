import type { User } from './user';

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  liked: boolean;
}

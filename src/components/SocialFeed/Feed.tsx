import { useState, useRef, useCallback } from 'react';
import type { Post } from '../../types/social';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';

const BASE_USER = {
  id: '1',
  name: 'Alice Johnson',
  bio: 'Frontend developer',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  followers: 1420,
  following: 312,
  posts: 87,
  isFollowing: false,
};

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    author: BASE_USER,
    content: 'Just shipped the new design system! 🎨 Took 3 months but totally worth it. Every component is accessible and dark-mode ready.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop',
    likes: 42,
    comments: [
      { id: 'c1', author: { id: '2', name: 'Bob', bio: '', followers: 0, following: 0, posts: 0, isFollowing: false }, content: 'Looks amazing! 🔥', createdAt: '5 min ago' },
    ],
    createdAt: '1h ago',
    liked: false,
  },
  {
    id: '2',
    author: { ...BASE_USER, id: '2', name: 'Bob Martinez', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    content: 'TypeScript 5.5 is incredible. The new inference improvements alone save me hours every week.',
    likes: 28,
    comments: [],
    createdAt: '3h ago',
    liked: true,
  },
  {
    id: '3',
    author: { ...BASE_USER, id: '3', name: 'Carol Smith', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    content: 'Hot take: the best code is the code you delete. Removed 2000 lines of dead code today and the app is 15% faster. 🚀',
    likes: 91,
    comments: [],
    createdAt: '5h ago',
    liked: false,
  },
];

export function Feed() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleUpdate = useCallback((updated: Post) => {
    setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
  }, []);

  function handleCreate(content: string) {
    const post: Post = {
      id: String(Date.now()),
      author: { id: 'me', name: 'You', bio: '', followers: 0, following: 0, posts: 0, isFollowing: false },
      content,
      likes: 0,
      comments: [],
      createdAt: 'just now',
      liked: false,
    };
    setPosts((prev) => [post, ...prev]);
  }

  function handleLoadMore() {
    setPage((p) => p + 1);
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <CreatePost onPost={handleCreate} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onUpdate={handleUpdate} />
      ))}
      <div ref={loaderRef} className="text-center py-4">
        <button
          onClick={handleLoadMore}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          {page < 3 ? 'Load more posts...' : 'You\'re all caught up!'}
        </button>
      </div>
    </div>
  );
}

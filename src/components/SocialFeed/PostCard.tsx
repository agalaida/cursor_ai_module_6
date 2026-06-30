import { useState } from 'react';
import type { Post, Comment } from '../../types/social';
import { Avatar } from '../shared/Avatar';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
}

export function PostCard({ post, onUpdate }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  function handleLike() {
    onUpdate({ ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 });
  }

  function handleAddComment(content: string) {
    const comment: Comment = {
      id: String(Date.now()),
      author: {
        id: 'me',
        name: 'You',
        bio: '',
        followers: 0,
        following: 0,
        posts: 0,
        isFollowing: false,
      },
      content,
      createdAt: 'just now',
    };
    onUpdate({ ...post, comments: [...post.comments, comment] });
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={post.author.avatarUrl} name={post.author.name} size="md" />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
          <time className="text-xs text-gray-400">{post.createdAt}</time>
        </div>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post image"
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          aria-label={post.liked ? 'Unlike post' : 'Like post'}
          aria-pressed={post.liked}
          className={`flex items-center gap-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 ${post.liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'}`}
        >
          <svg className="w-4 h-4" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
        <button
          onClick={() => setShowComments((o) => !o)}
          aria-label="Toggle comments"
          aria-expanded={showComments}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comments.length}
        </button>
        <button
          aria-label="Share post"
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 ml-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
      {showComments && (
        <CommentSection comments={post.comments} onAddComment={handleAddComment} />
      )}
    </article>
  );
}

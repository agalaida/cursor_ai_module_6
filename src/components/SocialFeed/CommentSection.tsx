import { useState } from 'react';
import type { Comment } from '../../types/social';
import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText('');
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2 mb-2">
          <Avatar src={c.author.avatarUrl} name={c.author.name} size="sm" />
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2 flex-1">
            <p className="text-xs font-semibold text-gray-900 dark:text-white">{c.author.name}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{c.content}</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <label htmlFor="comment-input" className="sr-only">Add a comment</label>
        <input
          id="comment-input"
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button type="submit" size="sm">Post</Button>
      </form>
    </div>
  );
}

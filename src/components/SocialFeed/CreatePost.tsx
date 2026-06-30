import { useState } from 'react';
import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface CreatePostProps {
  onPost: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content.trim());
    setContent('');
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-3">
          <Avatar name="You" size="md" />
          <div className="flex-1">
            <label htmlFor="post-content" className="sr-only">What's on your mind?</label>
            <textarea
              id="post-content"
              rows={3}
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!content.trim()}>Post</Button>
        </div>
      </form>
    </div>
  );
}

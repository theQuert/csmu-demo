'use client';

import Link from 'next/link';
import { PostMetadata } from '../lib/posts';
import TagList from './TagList';

interface PostListProps {
  posts: PostMetadata[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.id} className="border-b pb-6 dark:border-gray-700">
          <Link 
            href={`/posts/${post.id}`}
            className="block group"
          >
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <time className="text-sm text-gray-600 dark:text-gray-400 block mb-2">
              {formatDate(post.date)}
            </time>
          </Link>
          <TagList tags={post.tags} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
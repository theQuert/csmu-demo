'use client';

import Link from 'next/link';
import React from 'react';

interface TagListProps {
  tags: string[];
  currentTag?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, currentTag }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <Link 
          key={tag} 
          href={`/tags/${encodeURIComponent(tag)}`}
          className={`px-3 py-1 text-sm rounded-full ${
            currentTag === tag 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
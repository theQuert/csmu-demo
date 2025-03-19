'use client';

import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-4">文章找不到</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        您查詢的文章不存在或已被移除。
      </p>
      <Link 
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        返回首頁
      </Link>
    </div>
  );
}
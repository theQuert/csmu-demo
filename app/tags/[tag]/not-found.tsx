'use client';

import Link from 'next/link';

export default function TagNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-4">標籤找不到</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        您查詢的標籤不存在或沒有相關文章。
      </p>
      <div className="flex gap-4">
        <Link 
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首頁
        </Link>
        <Link 
          href="/tags"
          className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          查看所有標籤
        </Link>
      </div>
    </div>
  );
}
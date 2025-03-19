import { getAllTags, getPostsByTag } from '../../lib/posts';
import PostList from '../../components/PostList';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 生成靜態路徑
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

// 專門為處理參數的 middleware 函數
async function getParams(params: { tag: string }) {
  return params;
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  // 等待參數的解析
  const resolvedParams = await getParams(params);
  // 解碼標籤，避免 URL 編碼問題
  const decodedTag = decodeURIComponent(resolvedParams.tag);
  const posts = getPostsByTag(decodedTag);
  
  // 如果該標籤不存在，返回 404
  if (!posts.length) {
    notFound();
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回標籤列表
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">
        標籤：<span className="text-blue-600 dark:text-blue-400">#{decodedTag}</span>
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        以下是標籤為 <span className="font-semibold">#{decodedTag}</span> 的所有文章
      </p>
      
      <PostList posts={posts} />
    </div>
  );
}
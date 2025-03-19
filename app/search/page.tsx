import { searchPosts } from '../lib/posts';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const posts = query ? await searchPosts(query) : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回首頁
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">搜尋結果</h1>

      <div className="mb-8">
        <SearchBar placeholder="重新搜尋..." />
      </div>

      {query ? (
        <>
          <p className="text-lg mb-6">
            {posts.length > 0
              ? `找到 ${posts.length} 個與「${query}」相關的結果`
              : `沒有找到與「${query}」相關的結果`}
          </p>

          {posts.length > 0 && <PostList posts={posts} />}
        </>
      ) : (
        <p className="text-lg text-center py-10">請輸入搜尋關鍵字</p>
      )}
    </div>
  );
}
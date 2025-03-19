import { getAllPostsMetadata } from './lib/posts';
import PostList from './components/PostList';

export default function Home() {
  const posts = getAllPostsMetadata();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">技術部落格</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          分享最新的技術知識、經驗和見解
        </p>
      </div>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">目前還沒有文章，敬請期待！</p>
        </div>
      )}
    </div>
  );
}

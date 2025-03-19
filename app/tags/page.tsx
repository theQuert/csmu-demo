import { getAllTags } from '../lib/posts';
import TagList from '../components/TagList';

export default function Tags() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">標籤</h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        瀏覽所有文章標籤
      </p>
      
      {tags.length > 0 ? (
        <TagList tags={tags} />
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">目前還沒有標籤</p>
        </div>
      )}
    </div>
  );
}
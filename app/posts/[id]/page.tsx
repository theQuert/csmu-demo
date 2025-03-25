import { getAllPostIds, getPostData } from '../../lib/posts';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import TagList from '../../components/TagList';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// 生成靜態路徑
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// 定義頁面參數類型
type Props = {
  params: { id: string }
}

export default async function Post({ params }: Props) {
  try {
    const postData = await getPostData(params.id);
    
    return (
      <article className="max-w-4xl mx-auto">
        {/* 返回首頁連結 */}
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
        
        {/* 文章標題 */}
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        
        {/* 發佈日期 */}
        <time className="text-gray-600 dark:text-gray-400 block mb-4">
          {formatDate(postData.date)}
        </time>
        
        {/* 標籤列表 */}
        <div className="mb-8">
          <TagList tags={postData.tags} />
        </div>
        
        {/* Markdown 内容 */}
        <div className="prose-container">
          <MarkdownRenderer content={postData.content} />
        </div>
      </article>
    );
  } catch (error) {
    console.error('Failed to load post:', error);
    notFound();
  }
}
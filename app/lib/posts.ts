import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 定義文章介面
export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

export interface Post extends PostMetadata {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content');

// 獲取所有文章的元數據
export function getAllPostsMetadata(): PostMetadata[] {
  // 確保目錄存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  // 獲取目錄中的所有檔案名稱
  const filenames = fs.readdirSync(postsDirectory);
  
  // 獲取每個檔案的元數據
  const allPostsData = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      // 從檔案名稱中移除 ".md" 以獲取 id
      const id = filename.replace(/\.md$/, '');
      
      // 讀取 markdown 檔案為字串
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 使用 gray-matter 解析 markdown 的元數據部分
      const matterResult = matter(fileContents);
      
      // 組合元數據與 id
      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        tags: matterResult.data.tags || [],
      } as PostMetadata;
    })
    // 依日期排序
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  
  return allPostsData;
}

// 獲取所有文章的 id
export function getAllPostIds() {
  // 確保目錄存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      return {
        params: {
          id: filename.replace(/\.md$/, ''),
        },
      };
    });
}

// 根據 id 獲取文章內容
export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // 使用 gray-matter 解析 markdown 的元數據部分
  const matterResult = matter(fileContents);
  
  // 組合數據與內容
  return {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags || [],
    content: matterResult.content,
  } as Post;
}

// 獲取所有標籤
export function getAllTags(): string[] {
  const posts = getAllPostsMetadata();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet);
}

// 根據標籤獲取文章
export function getPostsByTag(tag: string): PostMetadata[] {
  const posts = getAllPostsMetadata();
  return posts.filter(post => {
    if (!post.tags) return false;
    return post.tags.some(postTag => postTag === tag);
  });
}

// 全文搜尋文章
export async function searchPosts(query: string): Promise<PostMetadata[]> {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  const posts = getAllPostsMetadata();
  
  // 搜尋結果陣列
  const results: Array<{post: PostMetadata, score: number}> = [];
  
  // 遍歷所有文章
  for (const post of posts) {
    let score = 0;
    
    // 檢查標題
    if (post.title.toLowerCase().includes(normalizedQuery)) {
      score += 3; // 標題匹配加權
    }
    
    // 檢查標籤
    if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      score += 2; // 標籤匹配加權
    }
    
    // 檢查內容
    try {
      const fullPost = await getPostData(post.id);
      if (fullPost.content.toLowerCase().includes(normalizedQuery)) {
        score += 1; // 內容匹配加權
      }
    } catch (error) {
      console.error(`Error searching content in post ${post.id}:`, error);
    }
    
    // 如果有任何匹配，添加到結果中
    if (score > 0) {
      results.push({ post, score });
    }
  }
  
  // 根據分數排序結果
  results.sort((a, b) => b.score - a.score);
  
  // 返回排序好的文章列表
  return results.map(result => result.post);
}
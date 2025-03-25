'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose max-w-none prose-lg dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // 自定義代碼塊
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return (
              <pre className={`${match ? `language-${match[1]}` : ''} p-4 overflow-x-auto rounded-lg my-4`}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          // 自定義連結
          a({ children, href, ...props }) {
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            }
            return (
              <Link href={href || '#'} {...props}>
                {children}
              </Link>
            );
          },
          // 自定義圖片
          img({ src, ...props }) {
            return (
              <img 
                src={src}
                alt={props.alt || '文章圖片'} 
                {...props} 
                className="mx-auto my-4 rounded-lg shadow-md max-w-full h-auto" 
                loading="lazy"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
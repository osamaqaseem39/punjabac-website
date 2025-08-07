import React from 'react';
import Link from 'next/link';
import { getImageUrl, getBlogImageUrl } from '../services/api';

const formatText = (text: string) => {
  // Replace headings
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');

  // Replace bold and italic
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<em>$1</em>');

  // Replace lists
  text = text.replace(/^- (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>').replace(/((?:<li>.*<\/li>\n?)+)/g, '<ol>$1</ol>');

  // Replace code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>');

  // Replace blockquotes
  text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Replace horizontal lines
  text = text.replace(/^---$/gm, '<hr>');

  // Replace links and images
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, (match, alt, src) => {
    const processedUrl = getBlogImageUrl(src) || src;
    return `<img src="${processedUrl}" alt="${alt}" class="blog-img" onerror="this.style.display='none'">`;
  });

  // Replace alignment tags
  text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');

  // Replace newlines with <br>
  text = text.replace(/\n/g, '<br>');

  return text;
};

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col">
      {/* Blog Image */}
      <div className="relative overflow-hidden">
        {blog.featuredImage ? (
          <>
            <img
              src={getBlogImageUrl(blog.featuredImage) || blog.featuredImage}
              alt={blog.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              width={400}
              height={224}
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: '14rem' }}
              onError={handleImageError}
            />
            {/* Fallback div - hidden by default, shown when image fails */}
            <div 
              className="w-full h-56 bg-gradient-to-br from-punjabac-brand/20 to-punjabac-brand/40 flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <svg className="w-16 h-16 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-punjabac-brand/20 to-punjabac-brand/40 flex items-center justify-center">
            <svg className="w-16 h-16 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      {/* Blog Info */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-punjabac-brand transition-colors">
          {blog.title}
        </h2>
        <div 
          className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]"
          dangerouslySetInnerHTML={{ 
            __html: formatText(blog.content.slice(0, 150)) + '...'
          }}
        />
        <span className="block mb-2 text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-auto inline-block bg-punjabac-brand text-white px-5 py-2 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors text-center"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard; 
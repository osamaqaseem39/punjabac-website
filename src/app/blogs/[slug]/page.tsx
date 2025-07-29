import React from 'react';
import Link from 'next/link';
import { blogsApi, Blog } from '../../../services/api';

export async function generateStaticParams() {
  try {
    console.log('Generating static params for blogs...');
    const blogs = await blogsApi.getAll();
    console.log('Found', blogs.length, 'published blogs for static generation');
    return blogs.map((blog: Blog) => ({ slug: blog.slug }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  try {
    console.log('Fetching blog with slug:', slug);
    const blog = await blogsApi.getBySlug(slug);
    console.log('Blog found:', blog ? 'Yes' : 'No');
    return blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

function formatBlogContent(text: string) {
  // Headings
  text = text.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>');
  text = text.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>');
  text = text.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>');
  
  // Bold and italic
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  text = text.replace(/__(.+?)__/g, '<em class="italic">$1</em>');
  
  // Lists
  text = text.replace(/^- (.+)$/gm, '<li class="mb-1">$1</li>');
  text = text.replace(/((?:<li class="mb-1">.*<\/li>\n?)+)/g, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>');
  text = text.replace(/^\d+\. (.+)$/gm, '<li class="mb-1">$1</li>');
  text = text.replace(/((?:<li class="mb-1">.*<\/li>\n?)+)/g, '<ol class="list-decimal list-inside mb-4 space-y-1">$1</ol>');
  
  // Code
  text = text.replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');
  
  // Blockquotes
  text = text.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-punjabac-brand pl-4 italic text-gray-600 my-4">$1</blockquote>');
  
  // Horizontal lines
  text = text.replace(/^---$/gm, '<hr class="my-8 border-gray-200">');
  
  // Links and images
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="text-punjabac-brand hover:underline">$1</a>');
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="blog-img rounded-lg shadow-md my-4 max-w-full" />');
  
  // Alignment tags
  text = text.replace(/<center>(.+?)<\/center>/g, '<div class="text-center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div class="text-right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div class="text-left">$1</div>');
  
  // Paragraphs
  text = text.replace(/\n\n/g, '</p><p class="mb-4">');
  text = '<p class="mb-4">' + text + '</p>';
  
  return text;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">
            The blog post you are looking for does not exist or is not published. It may have been moved or deleted.
          </p>
          <Link 
            href="/blogs" 
            className="inline-flex items-center bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-punjabac-brand hover:text-punjabac-brand-light transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>
        </nav>

        {/* Blog Content */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          {/* Blog Header */}
          <div className="p-8 md:p-12">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </header>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.content) }} 
            />
          </div>
        </article>

        {/* Related Content */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
          <p className="text-gray-600 mb-6">
            Explore more insights and tips about automotive air conditioning and maintenance.
          </p>
          <Link 
            href="/blogs" 
            className="inline-flex items-center bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
          >
            View All Articles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
} 
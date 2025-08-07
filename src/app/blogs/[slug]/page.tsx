'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import type { Blog } from '../../../services/api';

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
  text = text.replace(/!img\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1">');

  // Replace alignment tags
  text = text.replace(/<center>(.+?)<\/center>/g, '<div style="text-align: center">$1</div>');
  text = text.replace(/<right>(.+?)<\/right>/g, '<div style="text-align: right">$1</div>');
  text = text.replace(/<left>(.+?)<\/left>/g, '<div style="text-align: left">$1</div>');

  // Replace newlines with <br>
  text = text.replace(/\n/g, '<br>');

  return text;
};

const BlogDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://punjabac-admin.vercel.app/api/blogs/${slug}`);
        setBlog(res.data.status === 'published' ? res.data : null);
      } catch {
        setBlog(null);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (!blog) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-6">The blog you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/blogs" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/blogs" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Blogs
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{blog.title}</span>
          </nav>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            
            {/* Blog Meta Information */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 border-b border-gray-200 pb-4">
              <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.updatedAt !== blog.createdAt && (
                <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
              )}
            </div>

            {/* Blog Content */}
            <div 
              className="text-gray-700 mb-6 blog-content"
              dangerouslySetInnerHTML={{ 
                __html: formatText(blog.content) 
              }}
            />

            {/* Back to Blogs Link */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/blogs" 
                className="inline-flex items-center text-punjabac-brand hover:text-punjabac-brand-light transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogDetailPage; 
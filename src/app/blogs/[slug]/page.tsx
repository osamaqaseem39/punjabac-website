import React from 'react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(`https://punjabac-admin.vercel.app/api/blogs/${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.status === 'published' ? data : null;
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await fetchBlog(params.slug);

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you are looking for does not exist or is not published.</p>
        <a href="/blogs" className="text-punjabac-brand hover:underline">← Back to Blogs</a>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <span className="block mb-4 text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-8"
        />
      )}
      <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content }} />
      <a href="/blogs" className="inline-block mt-8 text-punjabac-brand hover:underline">← Back to Blogs</a>
    </main>
  );
} 
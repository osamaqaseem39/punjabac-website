import React, { useEffect, useState } from 'react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch('https://punjabac-admin.vercel.app/api/blogs');
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.filter((b) => b.status === 'published') : [];
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs().then(setBlogs).finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blog posts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col">
              {blog.featuredImage && (
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-2xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content.replace(/<[^>]+>/g, '').slice(0, 150)}...</p>
              <a
                href={`/blogs/${blog.slug}`}
                className="mt-auto inline-block bg-punjabac-brand text-white px-5 py-2 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
              >
                Read More
              </a>
              <span className="block mt-2 text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 
export const dynamic = "force-static";
import { blogsApi, Blog } from '../../services/api';
import GetAQueryForm from '../../components/GetAQueryForm';
import AutoCompanies from '../../components/AutoCompanies';
import BlogCard from '../../components/BlogCard';
import ContactSection from '../../components/ContactSection';

async function fetchBlogs(): Promise<Blog[]> {
  try {
    console.log('Fetching blogs from API...');
    const blogs = await blogsApi.getAll();
    console.log('Fetched blogs:', blogs.length, 'published blogs');
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      {/* Hero Section */}
      <section className="relative bg-punjabac-brand text-white py-20 overflow-hidden">
        {/* Decorative background graphic */}
        <img
          src="/images/breeze.webp"
          alt="Decorative Breeze Graphic"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-[500px] max-w-full opacity-30 blur-sm"
          style={{zIndex: 1}}
          aria-hidden="true"
          width={500}
          height={500}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{zIndex: 2}}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Explore our latest articles, tips, and updates on automotive air conditioning, maintenance, and industry news.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-medium">
                {blogs.length} Blog Posts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600 mb-6">
                  We're currently working on creating valuable content for you. Please check back soon for our latest articles and insights.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Coming Soon:</strong> Tips for AC maintenance, industry updates, and expert advice on automotive air conditioning systems.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Blog Post */}
              {blogs.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Latest Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                      <div key={blog._id} style={{ animationDelay: `${index * 100}ms` }}>
                        <BlogCard blog={blog} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Categories/Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Stay Updated
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Subscribe to our newsletter to get the latest updates on automotive AC technology, maintenance tips, and industry insights.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest Technology</h3>
                    <p className="text-gray-600">
                      Stay informed about the newest developments in automotive air conditioning technology and innovations.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Maintenance Tips</h3>
                    <p className="text-gray-600">
                      Learn essential maintenance practices to keep your vehicle's AC system running efficiently.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Insights</h3>
                    <p className="text-gray-600">
                      Get expert insights into the automotive AC industry trends and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      
      <AutoCompanies />
      <ContactSection />
    </main>
  );
} 
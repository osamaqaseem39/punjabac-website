'use client';

import React, { useState, useEffect } from 'react';
import { brandsApi, Brand, getImageUrl } from '../../services/api';
import ContactSection from '../../components/ContactSection';

const OurBrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add a minimum delay for better UX
        const [brandsData] = await Promise.all([
          brandsApi.getAll(),
          new Promise(resolve => setTimeout(resolve, 800)) // 800ms minimum delay
        ]);
        
        console.log('Fetched brands:', brandsData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to load brands. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-punjabac-brand mx-auto mb-4"></div>
            <p className="text-gray-600">Loading our trusted brands...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Brands</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Our Trusted Brands
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We partner with world-renowned automotive brands to provide you with the highest quality AC parts and components.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-medium">
                {brands.length} Premium Brands
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {brands.length > 0 ? (
            <>
              {/* Brands Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-16">
                {brands.map((brand, index) => (
                  <div
                    key={brand._id}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-square flex items-center justify-center mb-4">
                      {brand.image ? (
                        <img
                          src={getImageUrl(brand.image, 'brands') || ''}
                          alt={`${brand.name} logo`}
                          width={120}
                          height={120}
                          className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-punjabac-brand transition-colors">
                      {brand.name}
                    </h3>
                    {brand.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {brand.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Brand Features Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Why Choose Our Brands?
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We carefully select our brand partners to ensure you receive only the highest quality automotive AC components.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Genuine Quality</h3>
                    <p className="text-gray-600">
                      All our brands are officially authorized distributors, ensuring you get genuine parts with full warranty coverage.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Guaranteed</h3>
                    <p className="text-gray-600">
                      Our brands are tested and proven to deliver optimal performance and reliability in all conditions.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                    <p className="text-gray-600">
                      We offer the best prices for premium brands, making quality automotive parts accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Brands Available</h3>
                <p className="text-gray-600">
                  We're currently updating our brand partnerships. Please check back soon for our latest brand offerings.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactSection />
    </main>
  );
};

export default OurBrandsPage; 
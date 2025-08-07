import React from 'react';
import Link from 'next/link';
import { servicesApi } from '../../../services/api';
import { getImageUrl } from '../../../services/api';

export async function generateStaticParams() {
  try {
    const services = await servicesApi.getAll();
    return services.map(service => ({
      slug: servicesApi.generateSlug(service.title, service._id)
    }));
  } catch (error) {
    console.error('Error generating static params for services:', error);
    return [];
  }
}

// Server Component that fetches data
async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await servicesApi.getBySlug(slug);

  if (!service) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
            <p className="text-gray-600 mb-6">The service you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/services" className="bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors">
              ← Back to Services
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      {/* Breadcrumb Navigation */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Service Image */}
              {service.featuredImage && (
                <div className="lg:w-1/2">
                  <img
                    src={getImageUrl(service.featuredImage, 'services') || service.featuredImage}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Service Content */}
              <div className="lg:w-1/2 p-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                
                {/* Service Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, idx) => (
                        <span key={idx} className="inline-block bg-punjabac-brand/10 text-punjabac-brand px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  Added on {new Date(service.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Service Benefits */}
          {Array.isArray(service.benefits) && service.benefits.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Service Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-punjabac-brand/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {typeof benefit === 'string' ? benefit : benefit.name || benefit.text || 'Benefit'}
                      </h3>
                      {typeof benefit === 'object' && benefit.description && (
                        <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-punjabac-brand rounded-2xl p-8 text-center text-white mt-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-punjabac-brand/80 mb-6">
              Contact us today to schedule your service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-punjabac-brand px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Send Query/Feedback
              </Link>
              <a 
                href="tel:92-345-8428889" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-punjabac-brand transition-colors"
              >
                Call Now: 92-345-8428889
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiceDetailPage; 
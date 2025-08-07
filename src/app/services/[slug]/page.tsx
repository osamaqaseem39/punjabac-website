'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { servicesApi, Service } from '../../../services/api';

const ServiceDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const svc = await servicesApi.getBySlug(slug);
      setService(svc);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600">The service you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/services" className="text-punjabac-brand hover:text-punjabac-brand-light mt-4 inline-block">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/services" className="text-punjabac-brand hover:text-punjabac-brand-light mb-4 inline-block">
          ← Back to Services
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {service.featuredImage && (
            <div className="md:w-1/2">
              <img
                src={service.featuredImage}
                alt={service.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            <div className="text-sm text-gray-500">
              Added on {new Date(service.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      {Array.isArray(service.benefits) && service.benefits.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Service Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.benefits.map((benefit: any, idx: number) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-punjabac-brand/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{typeof benefit === 'string' ? benefit : benefit.name}</h3>
                  {benefit.description && (
                    <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Tags */}
      {service.tags && service.tags.length > 0 && (
        <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Service Features</h2>
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag: string, idx: number) => (
              <span key={idx} className="bg-punjabac-brand/10 text-punjabac-brand px-4 py-2 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="bg-punjabac-brand rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-punjabac-brand/80 mb-6">
          Contact us today to schedule your service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="bg-white text-punjabac-brand px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Send Query/Feedback
          </a>
          <a 
            href="tel:92-345-8428889" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-punjabac-brand transition-colors"
          >
            Call Now: 92-345-8428889
          </a>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailPage; 
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { servicesApi, Service } from '../services/api';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        console.log('Fetched services:', data); // Debug log
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fallback services if API fails or no services are available
  const fallbackServices: Array<Service & { icon: React.ReactNode; bgColor: string; iconColor: string }> = [
    {
      _id: 'fallback-1',
      title: 'AC Repair & Maintenance',
      description: 'Complete diagnostic and repair for all car AC systems. Fast, reliable, and professional service.',
      featuredImage: undefined,
      createdAt: '',
      updatedAt: '',
      icon: (
        <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-punjabac-brand/10',
      iconColor: 'text-punjabac-brand'
    },
    {
      _id: 'fallback-2',
      title: 'Refrigerant Recharge',
      description: 'Fast, professional refrigerant recharge using the latest equipment and best techniques.',
      featuredImage: undefined,
      createdAt: '',
      updatedAt: '',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      _id: 'fallback-3',
      title: 'Genuine Parts Replacement',
      description: 'Replacement of AC parts with genuine brands (DENSO, COOL GEAR, Sanden) for top performance.',
      featuredImage: undefined,
      createdAt: '',
      updatedAt: '',
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-punjabac-brand/10 text-punjabac-brand rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Professional Auto AC Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Modern tools, genuine parts, and unmatched professionalism in auto AC services.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-punjabac-brand"></div>
              <div className="mt-4 text-center text-gray-600">Loading services...</div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayServices.map((service, index) => {
                // For fallback services, create a custom card
                if (service._id.startsWith('fallback')) {
                  const fallbackService = service as Service & { icon: React.ReactNode; bgColor: string; iconColor: string };
                  return (
                    <div key={service._id || index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group">
                      <div className="h-48 bg-gradient-to-br from-punjabac-brand/10 to-punjabac-brand/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-punjabac-brand/30 rounded-full flex items-center justify-center">
                          {fallbackService.icon}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                          {service.description}
                        </p>
                        <div className="mt-auto">
                          <Link href="/services" className="text-punjabac-brand font-medium hover:text-punjabac-brand-light transition-colors flex items-center">
                            Learn More
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // For real services, use ServiceCard
                return (
                  <div key={service._id} style={{ animationDelay: `${index * 100}ms` }}>
                    <ServiceCard 
                      service={service} 
                      variant="homepage" 
                      showDate={false}
                      showGalleryCount={false}
                      showCategoryBadge={true}
                      showHoverEffects={true}
                    />
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link
                href="/services"
                className="inline-flex items-center bg-punjabac-brand text-white px-8 py-4 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
              >
                View All Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Services; 
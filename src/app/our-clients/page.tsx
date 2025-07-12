import React from 'react';
import ContactSection from '../../components/ContactSection';

const OurClientsPage = () => {
  const clients = [
    {
      name: 'Toyota Pakistan',
      logo: '/images/companies/toyota.png',
      category: 'Automotive Manufacturer',
      description: 'Long-term partnership providing AC services for their service centers across Pakistan.'
    },
    {
      name: 'Honda Pakistan',
      logo: '/images/companies/honda.png',
      category: 'Automotive Manufacturer',
      description: 'Trusted AC service provider for Honda dealerships and service centers.'
    },
    {
      name: 'Suzuki Pakistan',
      logo: '/images/companies/suzuki.png',
      category: 'Automotive Manufacturer',
      description: 'Reliable AC solutions for Suzuki vehicles and authorized service centers.'
    },
    {
      name: 'BMW Pakistan',
      logo: '/images/companies/bmw.png',
      category: 'Luxury Automotive',
      description: 'Premium AC services for BMW luxury vehicles and authorized dealerships.'
    },
    {
      name: 'Mercedes-Benz Pakistan',
      logo: '/images/companies/mercedes.png',
      category: 'Luxury Automotive',
      description: 'Expert AC services for Mercedes-Benz vehicles and authorized service centers.'
    },
    {
      name: 'Hyundai Pakistan',
      logo: '/images/companies/hyundai.png',
      category: 'Automotive Manufacturer',
      description: 'Comprehensive AC solutions for Hyundai vehicles and dealerships.'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      position: 'Fleet Manager',
      company: 'City Transport Services',
      image: '/images/testimonials/client1.jpg',
      rating: 5,
      text: 'Punjab Car AC has been our trusted partner for over 10 years. Their service quality and reliability are unmatched. They keep our entire fleet running smoothly.'
    },
    {
      name: 'Fatima Ali',
      position: 'Owner',
      company: 'Luxury Car Rentals',
      image: '/images/testimonials/client2.jpg',
      rating: 5,
      text: 'Exceptional service and attention to detail. They understand the importance of maintaining our luxury vehicles to the highest standards.'
    },
    {
      name: 'Muhammad Khan',
      position: 'Service Manager',
      company: 'Toyota Dealership',
      image: '/images/testimonials/client3.jpg',
      rating: 5,
      text: 'Professional team with deep technical expertise. They consistently deliver quality work and maintain our high service standards.'
    },
    {
      name: 'Ayesha Malik',
      position: 'Operations Director',
      company: 'Corporate Fleet Solutions',
      image: '/images/testimonials/client4.jpg',
      rating: 5,
      text: 'Reliable, efficient, and cost-effective. Punjab Car AC has helped us maintain our corporate fleet with minimal downtime.'
    }
  ];

  const successStories = [
    {
      title: 'Fleet Management Success',
      description: 'Successfully managed AC maintenance for a 500+ vehicle corporate fleet, reducing downtime by 60%.',
      metrics: ['500+ Vehicles', '60% Downtime Reduction', '24/7 Support']
    },
    {
      title: 'Luxury Vehicle Specialization',
      description: 'Became the preferred AC service provider for luxury car dealerships across major cities.',
      metrics: ['15+ Dealerships', 'Premium Service', 'Certified Technicians']
    },
    {
      title: 'Emergency Response',
      description: 'Established 24/7 emergency AC services for critical vehicle fleets and emergency services.',
      metrics: ['24/7 Availability', 'Emergency Response', 'Mobile Service']
    }
  ];

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Valued Clients</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          One of the most experienced companies in the field of automobile air-conditioning in Pakistan, Punjab Car AC has earned a reputation for more than 30 years of solid, sound, dependable, and creditable expertise. We are proud to serve a diverse range of clients, from individual car owners to major automotive manufacturers and corporate fleets. Our commitment to excellence has earned us long-term partnerships.
        </p>
      </div>

      {/* Clients Grid */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Corporate Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading automotive manufacturers and corporate clients across Pakistan.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-punjabac-brand mb-2">{client.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{client.category}</p>
                <p className="text-gray-600 text-sm">{client.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real examples of how we&apos;ve helped our clients achieve their goals and maintain their vehicles.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-punjabac-brand to-punjabac-brand-light rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{story.title}</h3>
              <p className="mb-6 opacity-90">{story.description}</p>
              <div className="space-y-2">
                {story.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm font-medium">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with Punjab Car AC.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  <p className="text-punjabac-brand text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Categories */}
      <section className="mb-16">
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Client Categories We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive AC services to various types of clients across different sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Individual Owners</h3>
              <p className="text-gray-600 text-sm">Personal vehicle AC services and maintenance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Corporate Fleets</h3>
              <p className="text-gray-600 text-sm">Large fleet management and maintenance services</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Dealerships</h3>
              <p className="text-gray-600 text-sm">Authorized service centers and dealerships</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-punjabac-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manufacturers</h3>
              <p className="text-gray-600 text-sm">Automotive manufacturers and suppliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
};

export default OurClientsPage; 
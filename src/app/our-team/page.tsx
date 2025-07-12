import React from 'react';
import Image from 'next/image';
import ContactSection from '../../components/ContactSection';

const OurTeamPage = () => {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Expert Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Our sales, marketing, and technical team of professionals are some of the brightest minds in the industry. We focus our energy daily on providing technical solutions to meet the challenges of our clients. Our dedicated professionals work through the entire gamut of air-conditioning techniques and technology, maintenance, and service. The Company ensures that clients are given rapid development and facilitation at our platform of improved competitiveness.
        </p>
        
        {/* Team Image */}
        <div className="mb-12">
          <div className="relative max-w-4xl mx-auto">
            <Image
              src="/images/team.jpg"
              alt="Punjab Car AC Team"
              width={800}
              height={600}
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-12 text-xl text-gray-500 font-semibold">
          Our team information will be updated soon.
        </div>
      </div>
      <ContactSection />
    </main>
  );
};

export default OurTeamPage; 
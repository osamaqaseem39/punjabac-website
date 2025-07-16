import React from 'react';

const WhyChooseUs = () => (
  <section className="py-16 bg-punjabac-brand text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Choose Punjab AC?
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          One of the most experienced companies in the field of automobile air-conditioning in Pakistan, with over 30 years of solid, sound, dependable, and creditable expertise in the technology.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Experience & Reputation */}
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Decades of Credible Experience</h3>
          <p className="text-white/90">Over 30 years of solid, dependable expertise and a strong reputation in auto AC technology.</p>
        </div>
        {/* Innovation & Genuine Parts */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Innovative Techniques & Genuine Brands</h3>
          <p className="text-white/90">Pioneers in efficient installation, troubleshooting, and use of genuine brands like <span className="font-bold text-white">DENSO</span>, <span className="font-bold text-white">COOL GEAR</span>, <span className="font-bold text-white">SANDEN</span>.</p>
        </div>
        {/* Nationwide Network & Value */}
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Nationwide Network & Value</h3>
          <p className="text-white/90">Wholesale & retail network countrywide, offering unmatched value and professionalism—double the worth for your money.</p>
        </div>
        {/* Certified & Expert Technicians */}
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Certified & Expert Technicians</h3>
          <p className="text-white/90">A team of certified, highly qualified technologists—paid for perfection, not repetition. No inexperienced techs hired.</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs; 
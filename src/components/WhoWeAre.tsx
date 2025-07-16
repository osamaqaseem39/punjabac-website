import React from 'react';

const WhoWeAre = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center gap-6">
        {/* Logo above heading */}
        <div className="flex justify-center items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-punjabac-brand bg-white flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="/images/logo.png"
              alt="Punjab Car AC Logo"
              width={128}
              height={128}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
        </div>
        {/* Heading and Text Content */}
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-punjabac-brand mb-3">Who We Are?</h2>
          <p className="text-gray-900 mb-2 font-semibold text-justify" style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif', fontSize: '20px' }}>
            Punjab Car AC is one of Pakistan&apos;s most experienced automobile air conditioning companies, with over 30 years of solid, dependable expertise.
          </p>
          <p className="text-gray-600 mb-2 text-justify" style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif', fontSize: '20px' }}>
            We specialize in installation, troubleshooting, and replacement of auto AC systems and parts, using only genuine brands like 
            <span className="text-punjabac-brand font-bold"> DENSO</span>, 
            <span className="text-punjabac-brand font-bold"> COOL GEAR</span>, and 
            <span className="text-punjabac-brand font-bold"> SANDEN</span>.
          </p>
          <p className="text-gray-600 text-justify" style={{ fontFamily: 'Poppins, Arial, Helvetica, sans-serif', fontSize: '20px' }}>
            Our certified technicians deliver unmatched professionalism and quality, while our nationwide network ensures access to authentic air conditioning parts and systems.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhoWeAre; 
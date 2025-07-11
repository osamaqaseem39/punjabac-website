import React from 'react';

const companies = [
  { name: 'BMW', src: '/images/companies/bmw.png' },
  { name: 'Daihatsu', src: '/images/companies/diahatsu.png' },
  { name: 'Honda', src: '/images/companies/honda.png' },
  { name: 'Hyundai', src: '/images/companies/hyundai.png' },
  { name: 'Mercedes', src: '/images/companies/mercedes.png' },
  { name: 'Mitsubishi', src: '/images/companies/mitsubishi.png' },
  { name: 'Nissan', src: '/images/companies/nissan.png' },
  { name: 'Suzuki', src: '/images/companies/suzuki.png' },
  { name: 'Toyota', src: '/images/companies/toyota.png' },
];

const AutoCompanies = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Compatible With Major Auto Companies</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {companies.map((company) => (
            <div key={company.name} className="flex flex-col items-center min-w-[100px]">
              <img
                src={company.src}
                alt={company.name}
                className="h-12 w-auto object-contain mb-2 drop-shadow"
                loading="lazy"
              />
              <span className="text-sm text-gray-600">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoCompanies; 
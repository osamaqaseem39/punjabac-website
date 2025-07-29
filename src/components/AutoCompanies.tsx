import React from 'react';
import { AutoCompany, getImageUrl } from '../services/api';

interface AutoCompaniesProps {
  companies?: AutoCompany[];
}

const AutoCompanies: React.FC<AutoCompaniesProps> = ({ companies }) => {
  if (!companies || companies.length === 0) return null;
  
  const shouldAnimate = companies.length >= 5;
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Compatible With Major Auto Companies
        </h2>
        {/* Container */}
        <div className="relative overflow-hidden">
          <div className={`flex whitespace-nowrap ${shouldAnimate ? 'animate-marquee' : 'justify-center'}`}>
            {/* Single set of companies */}
            {companies.map((company, index) => {
              // Try to get logo from different possible fields
              const logoUrl = company.logo || company.image || `/images/companies/${company.name.toLowerCase()}.png`;
              const finalLogoUrl = logoUrl.startsWith('http') ? logoUrl : getImageUrl(logoUrl, 'brands') || logoUrl;
              
              return (
                <div 
                  key={company._id}
                  className="flex flex-col items-center mx-8 min-w-[150px] md:min-w-[180px] lg:min-w-[200px]"
                >
                  <img
                    src={finalLogoUrl}
                    alt={company.name}
                    width={150}
                    height={150}
                    className="h-16 md:h-20 lg:h-24 w-auto object-contain mb-3 drop-shadow-lg transition-all duration-300 hover:scale-110"
                  />
                  <span className="text-sm md:text-base text-gray-600 text-center font-medium">{company.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoCompanies; 
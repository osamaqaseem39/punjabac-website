'use client';

import React, { useState, useEffect } from 'react';
import { brandsApi, Brand, getImageUrl } from '../services/api';

interface BrandsProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showDescription?: boolean;
  className?: string;
}

const Brands: React.FC<BrandsProps> = ({
  title = "Our Trusted Brands",
  subtitle = "Quality brands you can rely on",
  maxItems,
  showDescription = true,
  className = ""
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // Add a minimum delay for better UX
        const [brandsData] = await Promise.all([
          brandsApi.getAll(),
          new Promise(resolve => setTimeout(resolve, 600)) // 600ms minimum delay
        ]);
        setBrands(maxItems ? brandsData.slice(0, maxItems) : brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [maxItems]);

  if (loading) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-punjabac-brand mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading brands...</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-6xl">
          {brands.map((brand) => (
            <div key={brand._id} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                {brand.image ? (
                  <img
                    src={getImageUrl(brand.image, 'brands') || ''}
                    alt={`${brand.name} logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-punjabac-brand/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-punjabac-brand">{brand.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-punjabac-brand transition-colors">
                {brand.name}
              </h3>
              {showDescription && brand.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {brand.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands; 
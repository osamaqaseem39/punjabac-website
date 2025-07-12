'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Service } from '../services/api';

interface ServiceCardProps {
  service: Service;
  variant?: 'default' | 'homepage' | 'compact';
  showDate?: boolean;
  showGalleryCount?: boolean;
  showCategoryBadge?: boolean;
  showHoverEffects?: boolean;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = 'default',
  showDate = true,
  showGalleryCount = false,
  showCategoryBadge = false,
  showHoverEffects = true,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image URL processing
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    } else if (imagePath.startsWith('/uploads/')) {
      return `https://punjabac-admin.vercel.app${imagePath}`;
    } else {
      return `https://punjabac-admin.vercel.app/uploads/services/${imagePath}`;
    }
  };

  const imageUrl = getImageUrl(service.featuredImage);
  const slug = `/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${service._id}`;

  // Fallback icon for services without images
  const fallbackIcon = (
    <svg className="w-8 h-8 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.error('Failed to load service image:', imageUrl);
  };

  const baseClasses = "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300";
  const hoverClasses = showHoverEffects ? "hover:shadow-xl hover:-translate-y-1" : "";
  const variantClasses = {
    default: "h-full flex flex-col",
    homepage: "h-full flex flex-col group",
    compact: "h-full flex flex-col"
  };

  return (
    <div className={`${baseClasses} ${hoverClasses} ${variantClasses[variant]} ${className}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {imageUrl && !imageError ? (
          <div className="aspect-w-16 aspect-h-9 relative">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-punjabac-brand border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={service.title}
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {showHoverEffects && variant === 'homepage' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href={slug}
                  className="opacity-0 group-hover:opacity-100 bg-white text-punjabac-brand px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                >
                  View Details
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-punjabac-brand/10 to-punjabac-brand/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-punjabac-brand/30 rounded-full flex items-center justify-center">
              {fallbackIcon}
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {showCategoryBadge && (
          <div className="absolute top-4 left-4">
            <span className="bg-punjabac-brand text-white px-3 py-1 rounded-full text-xs font-medium">
              Service
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            {showDate && (
              <span className="text-sm text-gray-500">
                {new Date(service.createdAt).toLocaleDateString()}
              </span>
            )}
            <Link
              href={slug}
              className="text-punjabac-brand font-medium hover:text-punjabac-brand-light transition-colors flex items-center"
            >
              Learn More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 
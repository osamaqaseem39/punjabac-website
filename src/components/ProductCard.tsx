'use client';

import React from 'react';
import Link from 'next/link';
import { Product, getImageUrl } from '../services/api';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'homepage' | 'simple';
  showDate?: boolean;
  showGalleryCount?: boolean;
  showCategoryBadge?: boolean;
  showHoverEffects?: boolean;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  showDate = true,
  showGalleryCount = true,
  showCategoryBadge = true,
  showHoverEffects = true,
  onClick
}) => {
 
  
  const slug = `${product.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}-${product._id}`;
  
  // Get image URL using utility function
  const imageUrl = getImageUrl(product.featuredImage, 'products');

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  };

  const baseClasses = showHoverEffects 
    ? "group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
    : "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden";

  const imageClasses = showHoverEffects
    ? "w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
    : "w-full h-48 object-cover";

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={baseClasses} onClick={handleCardClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={product.title}
              className={imageClasses}
              onError={handleImageError}
              width={224}
              height={140}
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: showHoverEffects ? '14rem' : '12rem' }}
            />
            {/* Fallback div - hidden by default, shown when image fails */}
            <div 
              className="w-full h-56 bg-gradient-to-br from-punjabac-brand/20 to-punjabac-brand/40 flex items-center justify-center"
              style={{ display: 'none' }}
            >
              <svg className="w-16 h-16 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-punjabac-brand/20 to-punjabac-brand/40 flex items-center justify-center">
            <svg className="w-16 h-16 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {showCategoryBadge && product.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-punjabac-brand text-white px-3 py-1 rounded-full text-xs font-medium">
              {typeof product.category === 'string' ? product.category : (product.category as any)?.name || 'Product'}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className={`text-xl font-bold text-gray-900 mb-3 ${showHoverEffects ? 'group-hover:text-punjabac-brand transition-colors line-clamp-2' : 'line-clamp-2'}`}>
          {product.title}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed min-h-[4.5rem]">
          {product.description.length > 150 ? product.description.slice(0, 150) + '...' : product.description}
        </p>
        
        {/* Product Meta */}
        {(showDate || showGalleryCount) && (
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            {showDate && (
              <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
            )}
            {showGalleryCount && product.gallery && product.gallery.length > 0 && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {product.gallery.length} images
              </span>
            )}
          </div>
        )}

        {/* Benefits */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {product.benefits.slice(0, 3).map((benefit: any, index: number) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-punjabac-brand/10 text-punjabac-brand border border-punjabac-brand/20"
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {typeof benefit === 'string' ? benefit : benefit.name}
                </span>
              ))}
              {product.benefits.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{product.benefits.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {onClick ? (
            <button
              className="flex-1 bg-punjabac-brand text-white py-3 px-4 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors text-center"
            >
              View Details
            </button>
          ) : (
          <Link
            href={`/products/${slug}`}
            className="flex-1 bg-punjabac-brand text-white py-3 px-4 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors text-center"
          >
            View Details
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
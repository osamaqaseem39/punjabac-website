'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productsApi, Product } from '../../../services/api';
import AutoCompanies from '../../../components/AutoCompanies';

const ProductDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const maxDescLength = 200;
  const isLongDesc = product?.description && product.description.length > maxDescLength;
  const displayDesc = showFullDesc || !isLongDesc
    ? product?.description
    : product?.description?.slice(0, maxDescLength) + '...';

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        const data = await productsApi.getBySlug(slug);
        setProduct(data);
        if (data?.featuredImage) {
          setSelectedImage(data.featuredImage);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            <div className="mt-4 text-center text-gray-600">Loading product details...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link href="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              ← Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const allImages = product.featuredImage 
    ? [product.featuredImage, ...(product.gallery || [])]
    : product.gallery || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Breadcrumb */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-punjabac-brand transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="relative">
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt={product.title}
                      className="image-zoom w-full h-96 lg:h-full object-cover cursor-pointer"
                      onClick={() => setShowImageModal(true)}
                    />
                    <button
                      onClick={() => setShowImageModal(true)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-96 lg:h-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                    <svg className="w-24 h-24 text-punjabac-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Image Thumbnails */}
                {allImages.length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex space-x-2 overflow-x-auto">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(image)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === image
                              ? 'border-indigo-600 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <span className="bg-punjabac-brand/10 text-punjabac-brand px-3 py-1 rounded-full text-sm font-medium">
                    Auto AC Parts
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="prose prose-gray max-w-none mb-8">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {displayDesc}
                    {isLongDesc && (
                      <button
                        type="button"
                        className="ml-2 text-punjabac-brand font-semibold hover:underline focus:outline-none"
                        onClick={() => setShowFullDesc((v) => !v)}
                      >
                        {showFullDesc ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </p>
                </div>

                {/* Product Meta */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Added on {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                  
                  {product.gallery && product.gallery.length > 0 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {product.gallery.length + (product.featuredImage ? 1 : 0)} images available
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-primary flex-1 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact for Quote
                  </button>
                  <button className="px-6 py-3 border-2 border-punjabac-brand text-punjabac-brand rounded-lg font-semibold hover:bg-punjabac-brand/10 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save
                  </button>
                </div>

                {/* Product Features */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Genuine Parts</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Quality Assured</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Warranty Included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Related products would be populated here */}
          </div>
        </div>
      </section>

      {/* Auto Companies Section */}
      <AutoCompanies />

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt={product.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage; 
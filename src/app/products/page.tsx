'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productsApi, Product, brandsApi, Brand, companiesApi, AutoCompany, categoriesApi, Category } from '../../services/api';
import AutoCompanies from '../../components/AutoCompanies';
import ProductCard from '../../components/ProductCard';
import GetAQueryForm from '../../components/GetAQueryForm';
import Image from 'next/image';
import ContactSection from '../../components/ContactSection';

// Loading component for Suspense fallback
const ProductsLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-punjabac-brand mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    </div>
  </div>
);

// Main products component
const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedAutoCompany, setSelectedAutoCompany] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [autoCompanies, setAutoCompanies] = useState<AutoCompany[]>([]);

  // Get URL parameters for initial filtering
  const categoryFilter = searchParams.get('category');
  const brandFilter = searchParams.get('brand');
  const autoCompanyFilter = searchParams.get('autoCompany');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, brandsData, autoCompaniesData] = await Promise.all([
          productsApi.getAll(),
          categoriesApi.getAll(),
          brandsApi.getAll(),
          companiesApi.getAll()
        ]);
        
        console.log('Fetched data:', {
          products: productsData.length,
          categories: categoriesData.length,
          brands: brandsData.length,
          autoCompanies: autoCompaniesData.length
        });
        
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setAutoCompanies(autoCompaniesData);
        
        // Set initial filters from URL parameters
        if (categoryFilter) {
          console.log('Setting initial category filter:', categoryFilter);
          setSelectedCategory(categoryFilter);
        }
        if (brandFilter) {
          console.log('Setting initial brand filter:', brandFilter);
          setSelectedBrand(brandFilter);
        }
        if (autoCompanyFilter) {
          console.log('Setting initial auto company filter:', autoCompanyFilter);
          setSelectedAutoCompany(autoCompanyFilter);
        }
        
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryFilter, brandFilter, autoCompanyFilter]);

  // Filter products based on search term and filters
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const productCategory = typeof product.category === 'string' ? product.category : product.category?._id;
        return productCategory === selectedCategory;
      });
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => {
        const productBrand = typeof product.brand === 'string' ? product.brand : product.brand?._id;
        return productBrand === selectedBrand;
      });
    }

    // Filter by auto company
    if (selectedAutoCompany !== 'all') {
      filtered = filtered.filter(product =>
        product.autoCompanies && product.autoCompanies.includes(selectedAutoCompany)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedAutoCompany]);

  const handleFilterChange = (type: 'category' | 'brand' | 'autoCompany', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all') {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    
    // Clear other filters when one is selected
    if (type === 'category') {
      params.delete('brand');
      params.delete('autoCompany');
      setSelectedBrand('all');
      setSelectedAutoCompany('all');
    } else if (type === 'brand') {
      params.delete('category');
      params.delete('autoCompany');
      setSelectedCategory('all');
      setSelectedAutoCompany('all');
    } else if (type === 'autoCompany') {
      params.delete('category');
      params.delete('brand');
      setSelectedCategory('all');
      setSelectedBrand('all');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedAutoCompany('all');
    router.push('/products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-punjabac-brand mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-punjabac-brand/5">
      {/* Hero Section */}
      <section className="relative bg-punjabac-brand text-white py-20 overflow-hidden">
        {/* Decorative background graphic */}
        <img
          src="/images/breeze.webp"
          alt="Decorative Breeze Graphic"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-[500px] max-w-full opacity-30 blur-sm"
          style={{zIndex: 1}}
          aria-hidden="true"
          width={500}
          height={500}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{zIndex: 2}}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Quality Products
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of genuine auto AC parts and components from trusted brands.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-white font-medium">
                {products.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent transition-all duration-200"
              />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
              {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleFilterChange('category', category._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category._id
                        ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Brand Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('brand', 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedBrand === 'all'
                      ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Brands
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand._id}
                    onClick={() => handleFilterChange('brand', brand._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedBrand === brand._id
                        ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>

              {/* Auto Company Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('autoCompany', 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedAutoCompany === 'all'
                      ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Auto Companies
                </button>
                {autoCompanies.map((company) => (
                  <button
                    key={company._id}
                    onClick={() => handleFilterChange('autoCompany', company._id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedAutoCompany === company._id
                        ? 'bg-punjabac-brand text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {company.name}
                </button>
              ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all') && (
              <div className="flex justify-center">
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 text-punjabac-brand font-medium hover:text-punjabac-brand-light transition-colors border border-punjabac-brand rounded-lg hover:bg-punjabac-brand/5"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          {!loading && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-punjabac-brand">{filteredProducts.length}</span> of{' '}
                <span className="font-semibold">{products.length}</span> products
              </p>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-punjabac-brand"></div>
                <div className="mt-4 text-center text-gray-600">Loading products...</div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div key={product._id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard 
                    product={product} 
                    variant="homepage" 
                    showDate={false}
                    showGalleryCount={true}
                    showCategoryBadge={true}
                    showHoverEffects={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No products are currently available. Please check back later.'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all') && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-punjabac-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-punjabac-brand-light transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Auto Companies Section */}
      <AutoCompanies />
      
      <ContactSection />
    </main>
  );
};

// Main page component with Suspense boundary
const ProductsPage = () => {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage; 
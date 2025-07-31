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
  const [selectedBenefit, setSelectedBenefit] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [autoCompanies, setAutoCompanies] = useState<AutoCompany[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);

  // Get URL parameters for initial filtering
  const categoryFilter = searchParams.get('category');
  const brandFilter = searchParams.get('brand');
  const autoCompanyFilter = searchParams.get('autoCompany');
  const benefitFilter = searchParams.get('benefit');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching products...');
        console.log('Fetching categories...');
        console.log('Fetching brands...');
        console.log('Fetching auto companies...');
        console.log('Fetching benefits...');
        const [productsData, categoriesData, brandsData, autoCompaniesData, benefitsData] = await Promise.all([
          productsApi.getAll(),
          categoriesApi.getAll(),
          brandsApi.getAll(),
          companiesApi.getAll(),
          fetch('https://punjabac-admin.vercel.app/api/benefits?type=product').then(res => res.json())
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
        setBenefits(benefitsData);
        
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
        if (benefitFilter) {
          console.log('Setting initial benefit filter:', benefitFilter);
          setSelectedBenefit(benefitFilter);
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

    // Filter by benefit
    if (selectedBenefit !== 'all') {
      filtered = filtered.filter(product =>
        product.benefits && product.benefits.some((benefit: any) => {
          const benefitId = typeof benefit === 'string' ? benefit : benefit._id;
          return benefitId === selectedBenefit;
        })
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedAutoCompany, selectedBenefit]);

  const handleFilterChange = (type: 'category' | 'brand' | 'autoCompany' | 'benefit', value: string) => {
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
      params.delete('benefit');
      setSelectedBrand('all');
      setSelectedAutoCompany('all');
      setSelectedBenefit('all');
    } else if (type === 'brand') {
      params.delete('category');
      params.delete('autoCompany');
      params.delete('benefit');
      setSelectedCategory('all');
      setSelectedAutoCompany('all');
      setSelectedBenefit('all');
    } else if (type === 'autoCompany') {
      params.delete('category');
      params.delete('brand');
      params.delete('benefit');
      setSelectedCategory('all');
      setSelectedBrand('all');
      setSelectedBenefit('all');
    } else if (type === 'benefit') {
      params.delete('category');
      params.delete('brand');
      params.delete('autoCompany');
      setSelectedCategory('all');
      setSelectedBrand('all');
      setSelectedAutoCompany('all');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedAutoCompany('all');
    setSelectedBenefit('all');
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

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Category Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent transition-all duration-200 min-w-[150px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent transition-all duration-200 min-w-[150px]"
                >
                  <option value="all">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto Company Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Auto Company</label>
                <select
                  value={selectedAutoCompany}
                  onChange={(e) => handleFilterChange('autoCompany', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent transition-all duration-200 min-w-[150px]"
                >
                  <option value="all">All Auto Companies</option>
                  {autoCompanies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Benefit Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Benefit</label>
                <select
                  value={selectedBenefit}
                  onChange={(e) => handleFilterChange('benefit', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-punjabac-brand focus:border-transparent transition-all duration-200 min-w-[150px]"
                >
                  <option value="all">All Benefits</option>
                  {benefits.map((benefit) => (
                    <option key={benefit._id} value={benefit._id}>
                      {benefit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all' || selectedBenefit !== 'all') && (
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
                  {searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all' || selectedBenefit !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No products are currently available. Please check back later.'
                  }
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedAutoCompany !== 'all' || selectedBenefit !== 'all') && (
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
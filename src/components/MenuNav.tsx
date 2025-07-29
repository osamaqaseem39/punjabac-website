'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsApi, Product, categoriesApi, Category } from '../services/api';
import { brandsApi, Brand } from '../services/api';
import { usePathname } from 'next/navigation';

const ChevronDown = () => (
          <svg className="w-4 h-4 ml-1 inline-block text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuNav = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        // Filter only featured products
        const featuredProducts = data.filter(product => product.featured === true);
        setProducts(featuredProducts.slice(0, 10));
      } catch (error) {
        setProducts([]);
      }
    };
    const fetchCategories = async () => {
      try {
        const cats = await categoriesApi.getAll();
        setCategories(cats);
      } catch (error) {
        setCategories([]);
      }
    };
    const fetchBrands = async () => {
      try {
        const brs = await brandsApi.getAll();
        setBrands(brs);
      } catch (error) {
        setBrands([]);
      }
    };
    fetchProducts();
    fetchCategories();
    fetchBrands();
    setLoading(false);
  }, []);

  return (
    <nav aria-label="Main Navigation">
      <ul className="menu-nav flex space-x-16 items-center">
        <li>
          <Link href="/" className={pathname === '/' ? 'text-punjabac-brand font-bold underline' : ''}>Home</Link>
        </li>
        <li className="relative group">
          <button className={
            pathname.startsWith('/our-brands') || pathname.startsWith('/our-team') || pathname.startsWith('/our-clients') || pathname.startsWith('/company-profile') || pathname.startsWith('/sub-dealers') || pathname.startsWith('/blogs')
              ? 'font-bold text-punjabac-brand underline flex items-center gap-1'
              : 'font-medium flex items-center gap-1'
          } aria-haspopup="true" aria-expanded="false">
            Company <ChevronDown />
          </button>
          <ul className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10">
            <li><Link href="/our-brands" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-brands') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Brands</Link></li>
            <li><Link href="/our-team" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-team') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Team</Link></li>
            <li><Link href="/our-clients" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-clients') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Clients</Link></li>
            <li><Link href="/company-profile" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/company-profile') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Company Profile</Link></li>
            <li><Link href="/sub-dealers" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/sub-dealers') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Sub Dealers</Link></li>
            
            <li><Link href="/blogs" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/blogs') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Blogs</Link></li>
          </ul>
        </li>
        <li>
          <Link href="/services" className={pathname.startsWith('/services') ? 'text-punjabac-brand font-bold underline' : ''}>Services</Link>
        </li>
        
        {/* Products Dropdown with Categories and Brands as sub-menus */}
        <li className="relative group">
          <button className={
            pathname.startsWith('/products')
              ? 'font-bold text-punjabac-brand underline flex items-center gap-1'
              : 'font-medium flex items-center gap-1'
          } aria-haspopup="true" aria-expanded="false">
            Products <ChevronDown />
          </button>
          <ul className="absolute top-full left-0 w-80 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10 max-h-96 overflow-y-auto">
            <li><Link href="/products" className={`block px-4 py-2 hover:bg-gray-100 font-semibold text-punjabac-brand${pathname === '/products' ? ' bg-gray-100 font-bold underline' : ''}`}>All Products</Link></li>
            <li className="border-t border-gray-100 my-1"></li>
            
            {/* Categories Section */}
            <li className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">Categories</li>
            {categories.length === 0 ? (
              <li className="px-4 py-2 text-gray-400 text-sm">No categories</li>
            ) : categories.map((cat) => (
              <li key={cat._id}>
                <Link href={`/products?category=${cat._id}`} className="block px-4 py-2 hover:bg-gray-100 text-sm truncate">
                  {cat.name}
                </Link>
              </li>
            ))}
            
            <li className="border-t border-gray-100 my-1"></li>
            
            {/* Brands Section */}
            <li className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">Brands</li>
            {brands.length === 0 ? (
              <li className="px-4 py-2 text-gray-400 text-sm">No brands</li>
            ) : brands.map((brand) => (
              <li key={brand._id}>
                <Link href={`/products?brand=${brand._id}`} className="block px-4 py-2 hover:bg-gray-100 text-sm truncate">
                  {brand.name}
                </Link>
              </li>
            ))}
            
            <li className="border-t border-gray-100 my-1"></li>
            
            {/* Featured Products Section */}
            <li className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">Featured Products</li>
            {loading ? (
              <li className="px-4 py-2 text-gray-500 text-sm">Loading products...</li>
            ) : products.length > 0 ? (
              <>
                {products.map((product) => {
                  const slug = productsApi.generateSlug(product.title, product._id);
                  const productPath = `/products/${slug}`;
                  return (
                    <li key={product._id}>
                      <Link 
                        href={productPath} 
                        className={`block px-4 py-2 hover:bg-gray-100 text-sm truncate${pathname === productPath ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}
                        title={product.title}
                      >
                        {product.title}
                      </Link>
                    </li>
                  );
                })}
                {products.length >= 10 && (
                  <>
                    <li className="border-t border-gray-100 my-1"></li>
                    <li>
                      <Link href="/products" className={`block px-4 py-2 hover:bg-gray-100 text-sm text-punjabac-brand font-medium${pathname === '/products' ? ' bg-gray-100 font-bold underline' : ''}`}>
                        View All Products →
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No featured products available</li>
            )}
          </ul>
        </li>
        <li>
          <Link href="/contact" className={pathname.startsWith('/contact') ? 'text-punjabac-brand font-bold underline' : ''}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNav; 
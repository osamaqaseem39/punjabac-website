'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsApi, Product } from '../services/api';
import { usePathname } from 'next/navigation';

const ChevronDown = () => (
          <svg className="w-4 h-4 ml-1 inline-block text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MenuNav = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        // Limit to first 10 products for the dropdown menu
        setProducts(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching products for menu:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <nav aria-label="Main Navigation">
      <ul className="menu-nav flex space-x-8 items-center">
        <li>
          <Link href="/" className={pathname === '/' ? 'text-punjabac-brand font-bold underline' : ''}>Home</Link>
        </li>
        <li className="relative group">
          <button className={
            pathname.startsWith('/our-brands') || pathname.startsWith('/our-team') || pathname.startsWith('/our-clients') || pathname.startsWith('/company-profile') || pathname.startsWith('/sub-dealers')
              ? 'font-bold text-punjabac-brand underline flex items-center gap-1'
              : 'font-medium flex items-center gap-1'
          } aria-haspopup="true" aria-expanded="false">
            About Us <ChevronDown />
          </button>
          <ul className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10">
            <li><Link href="/our-brands" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-brands') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Brands</Link></li>
            <li><Link href="/our-team" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-team') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Team</Link></li>
            <li><Link href="/our-clients" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/our-clients') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Our Clients</Link></li>
            <li><Link href="/company-profile" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/company-profile') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Company Profile</Link></li>
            <li><Link href="/sub-dealers" className={`block px-4 py-2 hover:bg-gray-100${pathname.startsWith('/sub-dealers') ? ' bg-gray-100 text-punjabac-brand font-bold' : ''}`}>Sub Dealers</Link></li>
          </ul>
        </li>
        <li>
          <Link href="/services" className={pathname.startsWith('/services') ? 'text-punjabac-brand font-bold underline' : ''}>Services</Link>
        </li>
        <li className="relative group">
          <button className={
            pathname.startsWith('/products')
              ? 'font-bold text-punjabac-brand underline flex items-center gap-1'
              : 'font-medium flex items-center gap-1'
          } aria-haspopup="true" aria-expanded="false">
            Products <ChevronDown />
          </button>
          <ul className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto transition-all duration-200 origin-top z-10 max-h-96 overflow-y-auto">
            <li><Link href="/products" className={`block px-4 py-2 hover:bg-gray-100 font-semibold text-punjabac-brand${pathname === '/products' ? ' bg-gray-100 font-bold underline' : ''}`}>All Products</Link></li>
            {loading ? (
              <li className="px-4 py-2 text-gray-500 text-sm">Loading products...</li>
            ) : products.length > 0 ? (
              <>
                <li className="border-t border-gray-100 my-1"></li>
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
              <li className="px-4 py-2 text-gray-500 text-sm">No products available</li>
            )}
          </ul>
        </li>
        <li>
          <Link href="/blogs" className={pathname.startsWith('/blogs') ? 'text-punjabac-brand font-bold underline' : ''}>Blogs</Link>
        </li>
        <li>
          <Link href="/contact" className={pathname.startsWith('/contact') ? 'text-punjabac-brand font-bold underline' : ''}>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuNav; 
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../types/products";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length > 0) {
      const results = await client.fetch(
        `*[_type == "product" && lower(productName) match "*${query}*"]{
          _id,
          productName,
          price,
          image,
          slug
        }`
      );
      setFilteredProducts(results);
      setShowResults(true);
    } else {
      setFilteredProducts([]);
      setShowResults(false);
    }
  };

  // Close search results when clicking outside
  const handleClickOutside = () => {
    setShowResults(false);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white text-black">
      {/* Top Bar */}
      <div className="flex justify-end items-center text-xs py-2 px-8">
        <Link href="/store" className="mx-2 hover:underline">
          Find a Store
        </Link>
        
        <Link href="/get-help" className="mx-2 hover:underline">
          Help
        </Link>

        <Link href="/join-us" className="mx-2 hover:underline">
          Join Us
        </Link>
        <Link href="/sign-in" className="mx-2 hover:underline">
          Sign In
        </Link>
      </div>
      
      {/* Main Header */}
      <nav className="bg-white text-black border-b border-gray-200">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Left - Jordan Logo */}
          <div>
            <Image width={500} height={500}
              src="/images/jordan-logo.jpg"
              alt="Jordan Logo"
              className="h-6 w-auto"
            />
          </div>

          {/* Center - Nike Logo and Links */}
          <div className="flex items-center space-x-8">
            {/* Nike Logo */}
            <Image width={500} height={500}
              src="/images/nike-logo.png"
              alt="Nike Logo"
              className="h-6 w-auto"
            />
            {/* Links */}
            <div className="flex space-x-6 text-sm font-medium">
              {/* Updated New & Featured Link */}
              <Link href="/products" className="hover:underline">
                New & Featured
              </Link>
              <Link href="/men" className="hover:underline">
                Men
              </Link>
              <Link href="/women" className="hover:underline">
                Women
              </Link>
              <Link href="/kids" className="hover:underline">
                Kids
              </Link>
              <Link href="/sale" className="hover:underline">
                Sale
              </Link>
              <Link href="/snkrs" className="hover:underline">
                SNKRS
              </Link>
            </div>
          </div>

          {/* Right - Search Bar and Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="bg-gray-100 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none w-[200px]"
              />
              
              {/* Search Results Dropdown */}
              {showResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="flex items-center p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          window.location.href = `/product/${product.slug.current}`;
                          setShowResults(false);
                        }}
                      >
                        {product.image && (
                          <Image
                            src={urlFor(product.image).url()}
                            alt={product.productName}
                            width={40}
                            height={40}
                            className="rounded-md hover:scale-105 transition-transform duration-200"
                          />
                        )}
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{product.productName}</p>
                          <p className="text-sm text-gray-500">₹{product.price?.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Icons */}
            <Link href="/favorites" className="text-xl hover:text-gray-500">
              ❤️
            </Link>
            <Link href="/cart" className="text-xl hover:text-gray-500">
              🛒
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

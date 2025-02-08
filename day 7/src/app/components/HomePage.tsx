"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Image from 'next/image';
import { Product } from "../../../types/products";
import FeaturedProducts from './FeaturedProducts';

export default function HomePage({ products }: { products: Product[] }) {
  const [showGearUp, setShowGearUp] = useState(false);

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative w-full h-[700px]">
          <Image
            src="/images/nike-air-max-pulse.jpg"
            alt="Nike Air Max Pulse"
            layout="fill"
            objectFit="cover"
            priority
            className="transform scale-105 hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Your hero content */}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium athletic wear
            </p>
          </div>
          <FeaturedProducts products={products} />
        </div>
      </section>

      {/* Explore More Button */}
      <div className="flex justify-center py-12">
        <button 
          onClick={() => {
            setShowGearUp(true);
            setTimeout(() => {
              document.getElementById('gear-up-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="group flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800"
        >
          <span className="font-bold text-lg">Explore More</span>
          <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Gear Up Section */}
      {showGearUp && (
        <section id="gear-up-section" className="py-16">
          {/* Your gear up section content */}
        </section>
      )}

      <Footer />
    </div>
  );
} 
"use client";
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Image from 'next/image';
import { addToCart } from './actions/actions';
import Swal from 'sweetalert2';
import { client } from "@/sanity/lib/client";
import { Product } from "../../types/products";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";


// Server-side data fetching
async function getProducts(): Promise<Product[]> {
  return client.fetch(
    groq`*[_type == "product"][0...3]{
      _id,
      _type,
      productName,
      price,
      image,
      slug,
      description,
      inventory
    }`
  );
}

async function getMoreProducts(): Promise<Product[]> {
  const products = await client.fetch(
    groq`*[_type == "product"]{
      _id,
      _type,
      productName,
      price,
      image,
      slug,
      description,
      inventory
    }`
  );
  
  // Get products at indices 8, 12, and 13
  return [products[8], products[12], products[13]].filter(Boolean);
}

export default function Page() {
  const [showGearUp, setShowGearUp] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [moreProducts, setMoreProducts] = useState<Product[]>([]);

  // Fetch products on component mount
  React.useEffect(() => {
    getProducts().then(setProducts);
    getMoreProducts().then(setMoreProducts);
  }, []);

  return (
    <div>
      <Navbar />
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="space-y-6 max-w-4xl px-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-fade-in-down">
              NIKE AIR MAX PULSE
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-200 tracking-wide">
              Experience the Future of Comfort & Style
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Notify Me
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                Shop Air Max
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center">
              <span className="animate-bounce flex items-center text-white/80 text-sm font-medium">
                Scroll to Explore
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium athletic wear, designed for both performance and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product._id} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 bg-black bg-opacity-75 text-white text-sm font-medium rounded-full">
                    New Arrival
                  </span>
                  <span className="text-sm font-medium px-2 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-rose-600 rounded-full border border-rose-200 shadow-sm flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a.75.75 0 01.75.75v5.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0L6.2 7.26a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z"/>
                    </svg>
                    Limited Time
                  </span>
                </div>

                <div className="relative h-80 overflow-hidden">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.productName}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.productName}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          20% off
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        Swal.fire({
                          position: "top-right",
                          icon: "success",
                          showConfirmButton: false,
                          timer: 2000,
                          background: '#232323',
                          color: '#ffffff',
                          iconColor: '#4CAF50',
                          titleText: `${product.productName} added to cart`,
                          padding: '20px 30px',
                          customClass: {
                            popup: 'popup-style',
                            title: 'title-style',
                          },
                          toast: true,
                          timerProgressBar: true,
                          willClose: () => {
                            addToCart(product);
                          }
                        });
                      }}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Explore More Button */}
      <div className="flex justify-center py-12 bg-gradient-to-b from-gray-100 to-white">
        <button 
          onClick={() => {
            setShowGearUp(true);
            setTimeout(() => {
              document.getElementById('gear-up-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }, 100);
          }}
          className="group flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="font-bold text-lg">Explore More</span>
          <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* More Products Section */}
      {showGearUp && (
        <section id="gear-up-section" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
                Explore More
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover whats hot and trending in the world of athletic fashion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {moreProducts.map((product) => (
                <div key={product._id} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-full shadow-sm">
                      Trending
                    </span>
                    <span className="text-sm font-medium px-2 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-rose-600 rounded-full border border-rose-200 shadow-sm flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                      Hot Deal
                    </span>
                  </div>

                  <div className="relative h-80 overflow-hidden">
                    {product.image && (
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.productName}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {product.productName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500 line-through">
                            ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            20% off
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          Swal.fire({
                            position: "top-right",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                            background: '#232323',
                            color: '#ffffff',
                            iconColor: '#4CAF50',
                            titleText: `${product.productName} added to cart`,
                            padding: '20px 30px',
                            customClass: {
                              popup: 'popup-style',
                              title: 'title-style',
                            },
                            toast: true,
                            timerProgressBar: true,
                            willClose: () => {
                              addToCart(product);
                            }
                          });
                        }}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Professional Footer */}
      <footer className="bg-white-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">NIKE</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Bringing innovation and inspiration to every athlete in the world. If you have a body, you are an athlete.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mens</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Womens</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kids</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Help</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Payment Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for exclusive offers and updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm">
                © 2024 Nike, Inc. All Rights Reserved
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

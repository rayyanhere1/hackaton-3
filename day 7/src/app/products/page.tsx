"use client"; // Mark this file as a Client Component

import Navbar from "../components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";


const ProductsPage = () => {
  const [, setProduct] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);


  useEffect(() => {
    async function fetchProducts() {
      const fetchedProduct: Product[] = await client.fetch(allProducts);
      setProduct(fetchedProduct);
      setFilteredProducts(fetchedProduct); // Initialize filtered products
    }
    fetchProducts();
  }, []);

  // Add search handler
  

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "top-right",
      icon: "success",
      //title: `${product.productName} added to cart`,
      showConfirmButton: false,
      timer: 2000,
      background: '#232323',  // Dark gray background
      color: '#ffffff',  // White text for contrast
      iconColor: '#4CAF50',  // Smooth green for the success icon
      titleText: `${product.productName} added to cart`, // Clean modern font
      padding: '20px 30px',  // More padding for a spacious look
      customClass: {
        popup: 'popup-style',
        title: 'title-style',
      },
      toast: true,  // Makes it a toast message
      timerProgressBar: true,  // Adds a timer progress bar
      willClose: () => {
        addToCart(product);  // Calls addToCart after the alert closes
      }
    });
  };
  

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-6 shadow-2xl rounded-2xl border-2 border-gray-200 backdrop-filter backdrop-blur-lg sticky top-4 overflow-y-auto h-[calc(100vh-2rem)] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
        <h3 className="font-extrabold text-3xl mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-lg p-4 rounded-xl border-2 border-transparent hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-pink-50 flex items-center justify-center relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600/10 before:via-purple-600/10 before:to-pink-600/10 before:transform before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-700">
            Browse Categories
          </h3>
          <ul className="space-y-3">
            {[
              "Shoes",
              "Sports Bras", 
              "Tops & T-Shirts",
              "Hoodies & Sweatshirts",
              "Jackets",
              "Trousers & Tights", 
              "Shorts",
              "Tracksuits",
              "Jumpsuits & Rompers",
              "Skirts & Dresses",
              "Socks",
              "Accessories & Equipment"
            ].map((category) => (
              <li key={category} className="group">
                <a className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 transition-all duration-300 cursor-pointer">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-3"></span>
                  <span className="text-gray-800 group-hover:text-indigo-600 font-semibold transition-all duration-300">{category}</span>
                  <svg className="w-5 h-5 ml-auto text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </aside>

    {/* Main Content */}
    <main className="flex-1">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Our Latest Collection
            </h1>
            <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto">
              Explore our curated selection of premium shoes and athletic wear, designed for performance and style
            </p>
            
          
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 -z-10 rounded-3xl blur-3xl"></div>
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
              >
                <Link href={`/product/${product.slug.current}`}>
                {/* Product Image */}
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.productName}
                    width={800}
                    height={800}
                    priority
                    loading="eager"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={urlFor(product.image).width(100).quality(30).blur(30).url()}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-48 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-gray-200 hover:border-blue-400"
                  />
                )}

                {/* Just In Badge */}
                {product.newArrival && (
                  <span className="text-red-500 font-bold uppercase text-sm">
                    Just In
                  </span>
                )}

                {/* Product Details */}
                <h2 className="text-xl font-bold mt-4 tracking-tight hover:text-blue-600 transition-colors duration-200">{product.productName}</h2>
                {product.newArrival && (
                    <div className="inline-flex items-center px-2.5 py-0.5 mt-2 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
                        New Arrival
                    </div>
                )}
                <p className="text-gray-700 mt-2 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    {product.category}
                </p>
                <p className="text-gray-700 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                    {product.colors} Colors Available
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">
                        {product.price ? (
                            <span className="flex items-center">
                                ₹{product.price.toLocaleString('en-IN')}
                                <span className="ml-2 text-sm text-green-600 font-medium">10% off</span>
                            </span>
                        ) : (
                            "Price not available"
                        )}
                    </p>
                </div>
                <button 
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg 
                    hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 
                    uppercase tracking-wide border border-transparent hover:border-green-400"
                    onClick={(e) => handleAddToCart(e, product)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Add To Cart</span>
                </button>
                </Link>
              </div>
            ))}
          </div>

        </main>
    
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">About Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are dedicated to providing premium athletic wear and shoes, focusing on quality, comfort and style for our valued customers.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Customer Care</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Contact Support</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Shipping Information</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Returns & Exchanges</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Size Guide</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="hover:text-gray-900 cursor-pointer transition-colors">New Arrivals</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Best Sellers</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Special Offers</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Gift Cards</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Stay Connected</h3>
              <div className="flex space-x-5">
                <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
              </div>
              <form className="mt-4">
                <label htmlFor="email-subscription" className="sr-only">Email address</label>
                <div className="flex items-center">
                  <input
                    type="email"
                    id="email-subscription"
                    name="email"
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm px-4 py-2"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 bg-green-500 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              © 2024 Your Company Name. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;

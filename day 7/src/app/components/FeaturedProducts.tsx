"use client";

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../types/products";
import { addToCart } from "../actions/actions";
import Swal from 'sweetalert2';

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {products.map((product) => (
        <div key={product._id} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-black bg-opacity-75 text-white text-sm font-medium rounded-full">
              New Arrival
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
              <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
              <div className="flex space-x-2">
                <Link 
                  href={`/product/${product.slug.current}`}
                  className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Shop Now
                </Link>
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
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 
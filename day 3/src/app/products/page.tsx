"use client"; // Mark this file as a Client Component

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProduct: Product[] = await client.fetch(allProducts);
      setProduct(fetchedProduct);
    }
    fetchProducts();
  }, []);

  
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
        <aside className="w-1/4 bg-white p-6 shadow-md rounded-md">
          <h3 className="font-bold text-xl mb-6">Categories</h3>
          <ul className="space-y-4">
            <li className="hover:text-blue-500 cursor-pointer">Shoes</li>
            <li className="hover:text-blue-500 cursor-pointer">Sports Bras</li>
            <li className="hover:text-blue-500 cursor-pointer">Tops & T-Shirts</li>
            <li className="hover:text-blue-500 cursor-pointer">Hoodies & Sweatshirts</li>
            <li className="hover:text-blue-500 cursor-pointer">Jackets</li>
            <li className="hover:text-blue-500 cursor-pointer">Trousers & Tights</li>
            <li className="hover:text-blue-500 cursor-pointer">Shorts</li>
            <li className="hover:text-blue-500 cursor-pointer">Tracksuits</li>
            <li className="hover:text-blue-500 cursor-pointer">Jumpsuits & Rompers</li>
            <li className="hover:text-blue-500 cursor-pointer">Skirts & Dresses</li>
            <li className="hover:text-blue-500 cursor-pointer">Socks</li>
            <li className="hover:text-blue-500 cursor-pointer">Accessories & Equipment</li>
          </ul>
        </aside>

    {/* Main Content */}
    <main className="flex-1">
          <h1 className="text-3xl font-bold text-center mb-8">Our Latest Shoes And Products </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map((product) => (
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
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}

                {/* Just In Badge */}
                {product.newArrival && (
                  <span className="text-red-500 font-bold uppercase text-sm">
                    Just In
                  </span>
                )}

                {/* Product Details */}
                <h2 className="text-lg font-semibold mt-4">{product.productName}</h2>
                <p className="text-red-500 font-bold uppercase text-sm"> {product.newArrival}</p>
                <p className="text-gray-600 mt-1">{product.category}</p>
                <p className="text-gray-600">{product.colors} Colour</p>
                <p className="text-black font-bold mt-2">
                  {product.price ? `₹${product.price}` : "Price not available"}
                </p>
                <button 
                className="bg-gradient-to-r from-green-600 to-white-500 text-black font-semibold py-2 px-2 rounded-lg shadow-md hover:shadow-lg 
                hover:scale-110 transition-transform duration-300 ease-in-out
                "
                onClick={(e) => handleAddToCart (e,product)}
                >
                  Add To Cart 


                </button>
                </Link>
              </div>
            ))}
          </div>
        </main>
    
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;

"use client";

import { Product } from "../../../types/products";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) {
      handleQuantityChange(id, product.inventory - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventory,
      0
    );
  };

 
  const router = useRouter();
  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success!",
          "Your order has been successfully processed! ",
          "success"
        ); 
        router.push("/checkout");
        // Clear the cart after proceeding (optional)
        setCartItems([]);
      }
    });
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight border-b pb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Your Shopping Cart
      </h1>

      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                {item.image ? (
                  // For Sanity images
                  typeof item.image === 'object' && 'asset' in item.image ? (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.productName}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-gray-200 hover:border-blue-400"
                    />
                  ) : (
                    // For local images
                    <Image
                      src={item.image as string}
                      alt={item.productName}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-gray-200 hover:border-blue-400"
                    />
                  )
                ) : null}
                
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.productName}</h2>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg shadow-sm hover:from-gray-300 hover:to-gray-400 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 font-medium"
                      aria-label="Decrease quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-4 font-semibold text-gray-700 min-w-[2rem] text-center">{item.inventory}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-lg shadow-sm hover:from-gray-300 hover:to-gray-400 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 font-medium"
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center space-x-2 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Remove Item</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-xl text-gray-600 font-medium mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-6">Looks like you havent added anything to your cart yet</p>
            <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Continue Shopping
            </a>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleProceed}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
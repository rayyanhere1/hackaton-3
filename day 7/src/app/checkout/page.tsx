"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";



export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {

    Swal.fire({
      title: "🌟 Preparing Your Order! 🌟",
      text: "We're carefully crafting your order with love and attention...",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#FF5252",
      confirmButtonText: "✨ Complete My Order ✨",
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
      customClass: {
        title: 'text-2xl font-bold text-emerald-700',
        popup: 'rounded-2xl border-4 border-emerald-400 shadow-2xl',
        confirmButton: 'font-semibold tracking-wide hover:scale-105 transition-transform',
        cancelButton: 'font-medium'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (validateForm()) {
          localStorage.removeItem("appliedDiscount");
          
          Swal.fire({
            title: "🎉 Order Successfully Placed! 🎉",
            text: "Thank you for shopping with us! Your amazing products are on their way.",
            icon: "success",
            confirmButtonColor: "#4CAF50",
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            customClass: {
              popup: 'animate__animated animate__fadeIn rounded-2xl border-4 border-emerald-400',
              title: 'text-2xl font-bold text-emerald-700',
            }
          });
        } else {
          Swal.fire({
            title: "✋ Just a Moment!",
            text: "To ensure a perfect delivery, please fill in all the required details.",
            icon: "warning",
            confirmButtonColor: "#4CAF50",
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            },
            customClass: {
              popup: 'rounded-2xl border-4 border-amber-400',
              title: 'text-2xl font-bold text-amber-700'
            }
          });
        }
      }
    });

    
    const orderData = {
      _type: 'order',
      FirstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      email: formValues.email,
      cartItems: cartItems.map(item => ({
        _type: 'reference',
        _ref: item._id
      })),
      total: total,
      discount: discount,
      orderData: new Date().toISOString
    };

    try {
      await client.create(orderData)
      localStorage.removeItem("appliedDiscount")
    } catch (error) {
      console.error("error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4 bg-gray-50">
            <Link
              href="/cart"
              className="text-[#666666] hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              <span className="hover:underline">Cart</span>
              <span className="sr-only">Return to cart page</span>
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666] hover:text-black hover:scale-110 transition-all duration-300" />
            <span className="text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-md shadow-sm border border-gray-200 transition-all duration-300">
              Checkout
              <span className="ml-1 text-gray-500">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-4 border-b hover:bg-gray-100 transition-colors duration-300 rounded-md px-3"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md group">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.productName}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold hover:text-gray-700 transition-colors">{item.productName}</h3>
                    <p className="text-sm text-gray-600 mt-2 flex items-center">
                      <span className="mr-1">Quantity:</span>
                      <span className="font-medium bg-gray-100 px-2 py-0.5 rounded">{item.inventory}</span>
                    </p>
                    {item.colors && (
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <span className="mr-1">Color:</span>
                        <span className="font-medium inline-block w-4 h-4 rounded-full" style={{backgroundColor: item.colors[0]}}></span>
                        <span className="ml-1 font-medium">{item.colors[0]}</span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.price * item.inventory).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">${item.price.toFixed(2)}</span> per item
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

                    {/* Billing Form */}
                    <div className="bg-white border rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">Billing Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-600 mt-1">
                    First name is required.
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-600 mt-1">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                id="address"
                placeholder="Enter your complete address"
                value={formValues.address}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
                onChange={handleInputChange}
              />
              {formErrors.address && (
                <p className="text-sm text-red-600 mt-1">Address is required.</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  id="city"
                  placeholder="Enter your city"
                  value={formValues.city}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                  onChange={handleInputChange}
                />
                {formErrors.city && (
                  <p className="text-sm text-red-600 mt-1">City is required.</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input
                  id="zipCode"
                  placeholder="Enter your ZIP code"
                  value={formValues.zipCode}
                  type="text"
                  pattern="[0-9]*"
                  maxLength={5}
                  minLength={5}
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                  onChange={handleInputChange}
                />
                {formErrors.zipCode && (
                  <p className="text-sm text-red-600 mt-1">Valid ZIP code is required.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formValues.phone}
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                  onChange={handleInputChange}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-600 mt-1">Valid phone number is required.</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  placeholder="Enter your email address"
                  value={formValues.email}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-600 mt-1">Valid email address is required.</p>
                )}
              </div>
            </div>

            <button
              className="w-full py-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handlePlaceOrder}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    {/* Footer */}
    <footer className="bg-white border-t mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">FAQs</a></li>
            </ul>
          </div>

          {/* Secure Checkout */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Secure Checkout</h3>
            <p className="text-gray-600 mb-4">We use industry-standard encryption to protect your personal information.</p>
            <div className="flex gap-2">
              <span className="bg-gray-100 p-2 rounded">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/* Bottom Bar */}
    <div className="bg-gray-100 py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>
            © 2024 Your Store Name. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
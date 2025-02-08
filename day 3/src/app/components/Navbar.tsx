import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
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
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none"
              />
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

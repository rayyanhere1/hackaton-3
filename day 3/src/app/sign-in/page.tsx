import React from "react";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <Image width={200} height={200}
            src="/nike-logo.png"
            alt="Nike Logo"
            className="h-6 mr-4"
          />
          <nav className="space-x-4 text-sm font-medium">
            <a href="#" className="hover:underline">
              New & Featured
            </a>
            <a href="#" className="hover:underline">
              Men
            </a>
            <a href="#" className="hover:underline">
              Women
            </a>
            <a href="#" className="hover:underline">
              Kids
            </a>
            <a href="#" className="hover:underline">
              Sale
            </a>
            <a href="#" className="hover:underline">
              SNKRS
            </a>
          </nav>
        </div>
        <div className="space-x-4 text-sm">
          <a href="#" className="hover:underline">
            Find a Store
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            Join Us
          </a>
          <a href="#" className="hover:underline">
            Sign In
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <Image width={200} height={200}
            src=""
            alt="Nike Logo"
            className="h-8 mx-auto mb-4"
          />
          <h1 className="text-xl font-bold mb-6 text-black">
            YOUR ACCOUNT FOR EVERYTHING NIKE
          </h1>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border rounded-lg text-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg text-black"
            />
            <div className="flex justify-between items-center text-sm text-black">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 " />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgotten your password?
              </a>
            </div>
            <p className="text-xs text-gray-500">
              By logging in, you agree to Nikes{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </a>
              .
            </p>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold"
            >
              SIGN IN
            </button>
          </form>
          <p className="mt-4 text-sm text-black">
            Not a Member?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Join Us.
            </a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-bold mb-2">FIND A STORE</p>
            <p>BECOME A MEMBER</p>
            <p>SIGN UP FOR EMAIL</p>
            <p>SEND US FEEDBACK</p>
            <p>STUDENT DISCOUNTS</p>
          </div>
          <div>
            <p className="font-bold mb-2">GET HELP</p>
            <p>Order Status</p>
            <p>Delivery</p>
            <p>Returns</p>
            <p>Payment Options</p>
            <p>Contact Us</p>
          </div>
          <div>
            <p className="font-bold mb-2">ABOUT NIKE</p>
            <p>News</p>
            <p>Careers</p>
            <p>Investors</p>
            <p>Sustainability</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs mt-6">
          <p>&copy; 2023 Nike, Inc. All Rights Reserved</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Guides
            </a>
            <a href="#" className="hover:underline">
              Terms of Sale
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Nike Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignInPage;

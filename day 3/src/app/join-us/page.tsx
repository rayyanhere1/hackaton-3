import React from "react";

const JoinUs = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Page Content */}
      <div className="max-w-2xl mx-auto py-12 px-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">BECOME A NIKE MEMBER</h1>
        <p className="text-gray-600 text-sm text-center mb-8">
          Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
        </p>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-500"
              required
            >
              <option>United States</option>
              <option>India</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center text-sm">
              <input type="radio" name="gender" value="Male" className="mr-2" />
              Male
            </label>
            <label className="flex items-center text-sm">
              <input type="radio" name="gender" value="Female" className="mr-2" />
              Female
            </label>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" required />
            <label className="text-sm text-gray-600">
              Sign up for emails to get updates on products, offers, and Member benefits.
            </label>
          </div>

          <div className="text-xs text-gray-500">
            By creating an account, you agree to Nikes{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Terms of Use
            </a>
            .
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800"
          >
            JOIN US
          </button>
        </form>

        {/* Sign In Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already a Member?{" "}
          <a href="/sign-in" className="text-black font-medium underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;

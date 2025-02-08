import Image from "next/image";
import React from "react";

const MenPage = () => {
  return (
    <div className="bg-white text-black">
     <header className="border-b">
  <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
    {/* Left Section */}
    <div className="flex items-center space-x-6">
      {/* Jordan Logo */}
      <Image width={500} height={500}
        src="/images/jordan-logo.jpg"
        alt="Jordan Logo"
        className="h-6 w-6 object-contain"
      />
      {/* Nike Logo */}
      <Image width={500} height={500}
        src="/images/nike-logo.png"
        alt="Nike Logo"
        className="h-6 object-contain"
      />
    </div>

    {/* Navigation */}
    <nav className="flex-1 mx-8 flex justify-center space-x-8">
      <a href="#" className="text-sm hover:underline">
        New & Featured
      </a>
      <a href="#" className="text-sm border-b-2 border-black">
        Men
      </a>
      <a href="#" className="text-sm hover:underline">
        Women
      </a>
      <a href="#" className="text-sm hover:underline">
        Kids
      </a>
      <a href="#" className="text-sm hover:underline">
        Sale
      </a>
      <a href="#" className="text-sm hover:underline">
        SNKRS
      </a>
    </nav>

    {/* Right Section */}
    <div className="flex items-center space-x-4">
      <a href="#" className="text-sm hover:underline">
        Find a Store
      </a>
      <a href="#" className="text-sm hover:underline">
        Help
      </a>
      <a href="#" className="text-sm hover:underline">
        Hi, User
      </a>
      <button className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full">
       
      </button>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bag Section */}
        <div className="col-span-2">
          <h1 className="text-2xl font-semibold mb-4">Bag</h1>
          <div className="space-y-6">
            {/* Product 1 */}
            <div className="flex items-start border-b pb-6">
              <Image width={500} height={500}
                src="/images/mens 1.jpg"
                alt="Nike Dri-FIT ADV TechKnit Ultra"
                className="w-20 h-100 object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium">
                  Nike Dri-FIT ADV TechKnit Ultra
                </h2>
                <p className="text-sm text-gray-600">
                  Mens Short-Sleeve Running Top
                  <br />
                  Ashen Slate/Cobalt Bliss
                </p>
                <p className="mt-1 text-sm text-gray-600">Size: L</p>
                <p className="mt-1 text-sm text-gray-600">Quantity: 1</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium">MRP: ₹3,895.00</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    ❤️
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex items-start border-b pb-6">
              <Image width={500} height={500}
                src="/images/nike air max pulse.jpg"
                alt="Nike Air Max 97 SE"
                className="w-20 h-100 object-cover"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium">Nike Air Max 97 SE</h2>
                <p className="text-sm text-gray-600">
                  Mens Shoes
                  <br />
                  Flat Pewter/Light Bone/Black/White
                </p>
                <p className="mt-1 text-sm text-gray-600">Size: 8</p>
                <p className="mt-1 text-sm text-gray-600">Quantity: 1</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium">MRP: ₹16,995.00</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    ❤️
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹20,890.00</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Estimated Delivery & Handling</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-4">
            <span>Total</span>
            <span>₹20,890.00</span>
          </div>
          <button className="mt-6 w-full bg-black text-white py-3 rounded-lg">
            Member Checkout
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div>
            <h3 className="font-semibold">Find a Store</h3>
            <p className="text-sm mt-2">Become a Member</p>
            <p className="text-sm mt-2">Sign Up for Email</p>
            <p className="text-sm mt-2">Send Us Feedback</p>
          </div>
          <div>
            <h3 className="font-semibold">Get Help</h3>
            <p className="text-sm mt-2">Order Status</p>
            <p className="text-sm mt-2">Delivery</p>
            <p className="text-sm mt-2">Returns</p>
          </div>
          <div>
            <h3 className="font-semibold">About Nike</h3>
            <p className="text-sm mt-2">News</p>
            <p className="text-sm mt-2">Careers</p>
            <p className="text-sm mt-2">Investors</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenPage;

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <section className="relative">
        <div className="relative w-full h-[600px]">
          <Image
            src="/images/nike-air-max-pulse.jpg"
            alt="Nike Air Max Pulse"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 text-white">
          <h1 className="text-6xl font-extrabold mb-4">NIKE AIR MAX PULSE</h1>
          <p className="text-lg mb-6">First Look</p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-300">
              Notify Me
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-black">
              Shop Air Max
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-black">Featured Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { src: "/images/nike air max pulse.jpg", title: "Nike Air Max Pulse", price: "$120" },
        { src: "/images/1.jpg", title: "Nike Air Force", price: "$100" },
        { src: "/images/18.jpg", title: "Nike Air Max SYSTM", price: "$140" },
      ].map((product, idx) => (
        <div key={idx} className="p-4 bg-white rounded-lg shadow-md">
          <Image
            src={product.src}
            alt={product.title}
            width={500}
            height={200}
            className="mb-4 object-cover"
          />
          <h3 className="text-xl font-bold text-black">{product.title}</h3>
          <p className="text-black">{product.price}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Gear Up Section */}
      <section className="p-8 bg-white text-black">
        <h2 className="text-3xl font-bold mb-8 text-center">Gear Up</h2>
        <div className="flex justify-between items-center mb-8">
          {/* Shop Men's */}
          <div className="flex flex-col items-center">
            <button className="text-lg font-semibold flex items-center">
              Shop Mens <span className="mr-2">{`<`}</span>
              <span className="ml-2">{`>`}</span>
            </button>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[1, 2].map((img) => (
                <Image
                  key={img}
                  src={`/images/mens 1.jpg`}
                  alt={`Men's Item ${img}`}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              ))}
            </div>
          </div>

          {/* Shop Women's */}
          <div className="flex flex-col items-center">
            <button className="text-lg font-semibold flex items-center">
              Shop Womens <span className="mr-2">{`<`}</span>
              <span className="ml-2">{`>`}</span>
            </button>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[1, 2].map((img) => (
                <Image
                  key={img}
                  src={`/images/womens 1.jpg`}
                  alt={`Women's Item ${img}`}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        </section>
      <Footer />
    </div>
  );
};

export default HomePage;
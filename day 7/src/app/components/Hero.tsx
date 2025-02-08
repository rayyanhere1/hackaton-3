import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <Image  
        src="images/nike-air-max-pulse.jpg" // Replace with your image path
        width={40}
        height={20}
        alt="Nike Air Max Pulse"
        className="w-full h-[600px] object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 text-white">
        {/* Bold Title */}
        <h1 className="text-6xl font-extrabold mb-4">NIKE AIR MAX PULSE</h1>

        {/* Short Description */}
        <p className="text-lg mb-6">First Look</p>

        {/* Buttons */}
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
  );
};

export default Hero;

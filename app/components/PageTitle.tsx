'use client';

import React, { use } from 'react';
import { artType } from '../data/app';
import { useRouter } from 'next/navigation';


export default function PageTitle() {
  const Router = useRouter();
  return (
    // Main container for the hero section, centered vertically and horizontally
    <div className="flex flex-col items-center justify-center h-[75vh] text-center p-5 ">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-custom-airforce-blue mb-15 homepage-title">
        It's Meaningful
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-custom-paynes-gray max-w-3xl font-light transition-opacity duration-300">
        {artType.Home.quotes[0]}
      </p>
      <button
        onClick={() => Router.push('/paintings')} // Add this handler
        className="mt-15 px-16 py-3 rounded-full text-lg font-semibold shadow-custom-silver bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
      >
        Explore
      </button>
    </div>
  );
}

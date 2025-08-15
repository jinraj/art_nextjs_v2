import React from 'react';

interface TitleLayoutProps {
  title: string;
  quote: string;
}

export default function TitleLayout({ title, quote }: TitleLayoutProps) {
  return (
    // Main container for the hero section, centered vertically and horizontally
    <div className="flex flex-col items-center justify-center text-center mt-25 px-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-custom-airforce-blue mb-10 homepage-title">
        {title}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-custom-paynes-gray max-w-3xl font-light transition-opacity duration-300">
        {quote}
      </p>
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { testimonials } from "../data/app";

export const CustomerFeedback = () => {
  const itemsPerPage = 3;
  const totalBatches = Math.ceil(testimonials.length / itemsPerPage);
  const [currentBatch, setCurrentBatch] = useState(0);

  const nextBatch = () => setCurrentBatch((prev) => (prev + 1) % totalBatches);
  const prevBatch = () => setCurrentBatch((prev) => (prev - 1 + totalBatches) % totalBatches);

  useEffect(() => {
    const timer = setInterval(nextBatch, 5000);
    return () => clearInterval(timer);
  }, [currentBatch]);

  const visibleTestimonials = testimonials.slice(
    currentBatch * itemsPerPage,
    currentBatch * itemsPerPage + itemsPerPage
  );

  return (
    <div className="w-full py-26 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-custom-airforce-blue mb-20">
          What Our Clients Say
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm md:text-base leading-relaxed">
            {visibleTestimonials.map((t, index) => (
              <div
                key={index}
                className="p-4 transition-colors duration-300 bg-transparent"
              >
                <p className="italic text-md text-custom-paynes-gray mb-3">"{t.message}"</p>
                <p className="font-semibold text-sm text-custom-airforce-blue">- {t.name}</p>
                <p className="text-xs text-custom-silver">{t.title}</p>
              </div>
            ))}
          </div>

          {/* Controls: left arrow + dots + right arrow (keeps everything centered and visible on all devices) */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevBatch}
              aria-label="Previous testimonials"
              className="p-2 md:p-3 rounded-full bg-custom-airforce-blue hover:bg-custom-paynes-gray text-white transition-colors shadow-sm"
            >
              <HiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalBatches }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBatch(index)}
                  aria-label={`Go to batch ${index + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform ${
                    index === currentBatch ? "bg-custom-amber scale-110" : "bg-custom-silver"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextBatch}
              aria-label="Next testimonials"
              className="p-2 md:p-3 rounded-full bg-custom-airforce-blue hover:bg-custom-paynes-gray text-white transition-colors shadow-sm"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Artwork } from '../models/artwork';
import Image from 'next/image';
import { PreviewArtwork } from './PreviewArtwork';


interface ImageCardProps {
  listOfArtworks: Artwork[];
}

export default function ImageCard({ listOfArtworks }: ImageCardProps) {

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openPreviewModal = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const closePreviewModal = () => {
    setSelectedArtwork(null);
  };
  return (
    <div className=" text-custom-paynes-gray font-sans py-16 px-4 md:px-4 min-h-screen">

      {/* Gallery Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-6xl px-4">
        {listOfArtworks.map((painting, index) => (
          <div key={index} onClick={() => openPreviewModal(painting)}>
            {/* The painting image container with background and shadow */}
            <div
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white"
            >
              <div className="relative w-full h-[230px] md:h-[250px] lg:h-[300px]">
                <Image
                  src={painting.images[0]}
                  alt={painting.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
            {/* Painting Info Section, now outside the image div */}
            <div className="p-2 flex justify-between items-center text-sm">
              <h3 className="text-sm font-medium text-custom-paynes-gray">{painting.title}</h3>
              <p className="text-sm font-medium text-custom-silver">INR.{painting.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <PreviewArtwork
          artwork={selectedArtwork}
          onClose={closePreviewModal}
        />
      )}

    </div>
  );
};
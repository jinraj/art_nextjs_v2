'use client';

import React, { useState } from 'react';
import { ArtWork } from '../models/artwork';
// import PreviewArtworkPage from './PreviewArtwork';
import Image from 'next/image';
import { artworks } from '../data/app';
import { PreviewArtwork } from './PreviewArtwork';

const colorStyles = `
  .bg-custom-antiflash-white { background-color: #EEEEEE; }
  .bg-custom-paynes-gray { background-color: #475569; }
  .text-custom-paynes-gray { color: #475569; }
  .text-custom-amber { color: #FFC000; }
  .border-custom-amber { border-color: #FFC000; }
`;

interface ImageCardProps {
  listOfArtworks: ArtWork[];
}

export default function ImageCard({ listOfArtworks }: ImageCardProps) {

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const openPreviewModal = (artwork) => {
    console.log("artwork", artwork);
    setSelectedArtwork(artwork);
  };

  const closePreviewModal = () => {
    setSelectedArtwork(null);
  };
  return (
    <div className=" text-custom-paynes-gray font-sans py-16 px-4 md:px-4 min-h-screen">
      <style jsx global>{`
        ${colorStyles}
      `}</style>

      {/* Gallery Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-8">
        {artworks.map((painting, index) => (
          <div key={index} onClick={() => openPreviewModal(painting)}>
            {/* The painting image container with background and shadow */}
            <div
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out bg-white"
            >
              <img
                src={painting.images[0]}
                alt={painting.title}
                className="w-full h-[230px] md:h-[250px] lg:h-[350px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
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
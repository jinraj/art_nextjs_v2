'use client';

import React from 'react';
import { artworks } from '../data/app';
import { ScrollingColumn } from './ScrollingColumn';

// Fisher-Yates shuffle
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Chunk into smaller arrays
function chunkArray(array: any[], size: number) {
  const chunkedArr = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
}

export default function ArtworkGallery() {
  const shuffledArtworks = shuffleArray([...artworks]);
  const chunkedArtworks = chunkArray(shuffledArtworks, 2).slice(0, 5);

  return (
    <div className="container mx-auto pb-10 pt-0 px-4">
      {/* Animation */}
      <style>{`
        @keyframes scroll-up {
          from {
            transform: translateY(0%);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 items-end">
        {chunkedArtworks.map((column, columnIndex) => {
          const ht =
            columnIndex === 0 || columnIndex === chunkedArtworks.length - 1
              ? 'h-[700px]'
              : 'h-[550px]';

          // Show only first and last column on mobile
          const isMobileHidden =
            columnIndex !== 0 && columnIndex !== chunkedArtworks.length - 1
              ? 'hidden md:block'
              : '';

          return (
            <div key={columnIndex} className={isMobileHidden}>
              <ScrollingColumn images={column} divHeight={ht} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

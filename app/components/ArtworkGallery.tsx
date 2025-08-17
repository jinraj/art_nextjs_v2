'use client';

import React from 'react';
import { artworksSyntheticData } from '../data/app';
import { ScrollingColumn } from './ScrollingColumn';

// Fisher-Yates shuffle
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function splitIntoGroups(array: any[], groupsCount: number) {
  const result: any[][] = Array.from({ length: groupsCount }, () => []);
  array.forEach((item, index) => {
    result[index % groupsCount].push(item);
  });
  return result;
}

export default function ArtworkGallery() {
  const [chunkedArtworks, setChunkedArtworks] = React.useState<any[][]>([]);

  React.useEffect(() => {
    const shuffled = shuffleArray([...artworksSyntheticData]);
    const chunked = splitIntoGroups(shuffled, 5);
    console.log("chunkedArtworks", chunked)
    setChunkedArtworks(chunked);
  }, []);

  return (
    <div className="container mx-auto pb-10 pt-0 px-4">
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

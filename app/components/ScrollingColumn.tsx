import { useEffect, useRef } from "react";
import Image from 'next/image';

// New reusable component for a single scrolling column
export const ScrollingColumn = ({ images, divHeight, scrollSpeed }: { images: any[], divHeight: string, scrollSpeed: number }) => {
  const animatedColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animatedColumnRef.current) {
      animatedColumnRef.current.style.animationDuration = `${scrollSpeed}s`;
    }
  }, []);

  return (
    <div key={1} className={`relative flex flex-col gap-4 overflow-hidden ${divHeight} rounded-2xl`}>
      <div
        ref={animatedColumnRef}
        className="absolute flex flex-col gap-4 animate-scroll-up"
        style={{
          animationName: 'scroll-up',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }}
      >
        {images.concat(images).map((img, imgIndex) => (
          <div key={img.title + imgIndex} className="relative overflow-hidden rounded-lg">
            <Image
              src={img.images[0]}
              alt={img.title}
              width={280}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
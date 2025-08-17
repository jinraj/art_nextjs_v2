'use client';

import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/TitleLayout';
import { artType, artworksSyntheticData } from '../data/app';
import { ArtWork } from '../models/artwork';
import ImageCard from '../components/ImageCard';

const Decors = () => {
  const [decors, setDecors] = useState<ArtWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client after initial mount (hydration)
    const quotes = artType.Decors.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/artwork', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch artworks: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        // const artworks: ArtWork[] = Array.isArray(data) ? data : data?.artworks || [];
        const artworks: ArtWork[] = artworksSyntheticData;

        const filtered = artworks.filter(item => item.artType === artType.Decors.name);
        console.log("decors", decors);
        setDecors(filtered);
      } catch (err) {
        console.error('Error fetching artworks:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="min-h-screen">
      <TitleLayout
        title={artType.Decors.name}
        quote={randomQuote || artType.Decors.quotes[0]}
      />
      <div className="py-5 flex justify-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading: {error}</p>
        ) : decors.length === 0 ? (
          <p className="text-gray-500">No decors available.</p>
        ) : (
          <ImageCard listOfArtworks={decors} />
        )}
      </div>
    </div>
  );
};

export default Decors;
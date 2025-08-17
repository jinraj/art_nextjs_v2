'use client';

import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/TitleLayout';
import { mockArtworks } from '../data/mockData';
import { Artwork } from '../models/artwork';
import ImageCard from '../components/ImageCard';
import { artType } from '../data/app';

const Photography = () => {
  const [photography, setPhotography] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client after initial mount (hydration)
    const quotes = artType.Photography.quotes;
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
        // const artworks: Artwork[] = Array.isArray(data) ? data : data?.artworks || [];
        const artworks: Artwork[] = mockArtworks;

        const filtered = artworks.filter(item => item.artType === artType.Photography.name);
        console.log("photography", photography);
        setPhotography(filtered);
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
        title={artType.Photography.name}
        quote={randomQuote || artType.Photography.quotes[0]}
      />
      <div className="py-5 flex justify-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading: {error}</p>
        ) : photography.length === 0 ? (
          <p className="text-gray-500">No photography available.</p>
        ) : (
          <ImageCard listOfArtworks={photography} />
        )}
      </div>
    </div>
  );
};

export default Photography;
import React from 'react';
import PageTitle from './components/PageTitle';
import ArtworkGallery from './components/ArtworkGallery';
import { CustomerFeedback } from './components/CustomerFeedback';
import { VideoPlayer } from './components/VideoPlayer';
import { artType } from './data/app';
import { AboutArtist } from './components/AboutArtist';


export default function Home() {
  return (
    <div>
      <PageTitle />
      <ArtworkGallery />
      <div className="text-lg sm:text-xl md:text-2xl text-custom-paynes-gray max-w-3xl font-light text-center mx-auto my-20">
        {artType.Home.quotes[1]}
      </div>
      <VideoPlayer />
      <CustomerFeedback />
      <AboutArtist />
    </div>
  );
}

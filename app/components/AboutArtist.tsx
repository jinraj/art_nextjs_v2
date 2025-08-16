'use client';

import Image from 'next/image';
import React from 'react';

export const AboutArtist = () => {
    const sharedBio = "Welcome to our world of art. As a passionate father-son duo, we have dedicated our lives to capturing the beauty and emotion of the world through various mediums. From the vibrant strokes of acrylic on canvas to handcrafted decor, each piece is a reflection of our personal journeys and a shared passion for storytelling. Our goal is to create art that not only decorates a space but also resonates with the soul. Thank you for visiting our gallery.";

    return (
        <footer className="bg-custom-paynes-gray text-custom-white py-16 px-4 md:px-8 lg:px-12">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Meet the Artists</h2>
                <div className="flex flex-col md:flex-row justify-center py-10">
                    {/* Profile for Ramachandra */}
                    <div className="flex flex-col items-center text-center md:w-1/2">
                        <div className="flex-shrink-0 mb-4">
                            <div className="relative w-48 h-48 mx-auto">
                                <Image
                                    src="/resources/application/ramachandra.jpg"
                                    alt="Ramachandra's Profile"
                                    fill
                                    className="rounded-full object-cover shadow-lg"
                                />
                            </div>
                        </div>
                        <h3 className="text-md font-bold">Ramachandra</h3>
                    </div>
                    {/* Profile for Jinraj */}
                    <div className="flex flex-col items-center text-center md:w-1/2 mb-12 md:mb-0">
                        <div className="flex-shrink-0 mb-4">
                            <div className="relative w-48 h-48 mx-auto">
                                <Image
                                    src="/resources/application/jinraj.jpg"
                                    alt="Jinraj's Profile"
                                    fill
                                    className="rounded-full object-cover shadow-lg mx-auto"
                                />
                            </div>
                        </div>
                        <h3 className="text-md font-bold">Jinraj</h3>
                    </div>

                </div>
                <p className="text-lg font-light text-center leading-relaxed max-w-4xl mx-auto mb-12">
                    {sharedBio}
                </p>
            </div>
        </footer>
    );
};

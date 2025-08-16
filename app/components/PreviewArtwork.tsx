import { useState } from "react";

export const PreviewArtwork = ({ artwork, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const mainImageUrl = artwork.images[selectedImageIndex];

    return (
        <div className="fixed inset-0 z-500 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl w-full h-full md:h-5/6 flex flex-col overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-custom-paynes-gray text-2xl z-20 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>

                {/* Main Content: Scrollable Section */}
                <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                    {/* Left Side: Image */}
                    <div className="relative w-full md:w-3/5 flex-shrink-0 flex items-center justify-center">
                        <img src={mainImageUrl} alt={artwork.title} className="w-full h-full object-contain" />
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-2/5 p-8 flex flex-col">
                        {/* Thumbnails */}
                        {artwork.images.length > 1 && (
                            <div className="flex justify-start items-center gap-2 mb-4 overflow-x-auto p-2">
                                {artwork.images.map((imgUrl, index) => (
                                    <img
                                        key={index}
                                        src={imgUrl}
                                        alt={`${artwork.title} thumbnail ${index + 1}`}
                                        className={`w-12 h-12 object-cover rounded-full cursor-pointer border-2 transition-all duration-200
                                            ${selectedImageIndex === index ? 'border-custom-amber' : 'border-transparent'}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}

                        <h2 className="text-4xl font-bold text-custom-paynes-gray mb-2">{artwork.title}</h2>
                        <p className="text-xl text-gray-600 mb-4">by {artwork.artistName}</p>

                        <div className="space-y-4 text-sm text-gray-700 mt-4">
                            <p>
                                <span className="font-bold">Medium:</span> {artwork.medium}
                            </p>
                            <p>
                                <span className="font-bold">Dimensions:</span> {artwork.dimension}
                            </p>
                            <p>
                                <span className="font-bold">Price:</span> INR.{artwork.price}
                            </p>
                            <p className="mt-4 text-base leading-relaxed">
                                <span className="font-bold">Description:</span> {artwork.description}
                            </p>
                        </div>

                        <div className="mt-8 flex items-center justify-start">
                            {/* Like Button */}
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`flex items-center space-x-2 text-xl font-bold rounded-full py-2 px-6 transition-colors duration-300
                                    ${isLiked ? 'bg-custom-amber text-white' : 'border border-gray-300 text-gray-500 hover:bg-gray-100'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill={isLiked ? 'white' : 'none'}
                                    stroke={isLiked ? 'white' : 'currentColor'}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19.5 12.572C19.5 16.592 12 21 12 21s-7.5-4.408-7.5-8.428C4.5 9.092 6.572 7 9.15 7s5.35 2.092 5.35 2.092L12 11l-2.5-2c0 0-2.316-2.092-5-2.092S2 9.092 2 12.572C2 16.592 9.5 21 9.5 21S12 18.092 12 18.092z" />
                                </svg>
                                <span>{isLiked ? 'Liked' : 'Like'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

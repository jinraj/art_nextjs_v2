import { Copy, Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export const PreviewArtwork = ({ artwork, onClose }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const mainImageUrl = artwork.images[selectedImageIndex];
    const [likes, setLikes] = useState(artwork.likes);

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const shareOnWhatsApp = () => {
        const url = `https://api.whatsapp.com/send?text=Checkoutthisartwork:${window.location.href}`;
        window.open(url, "_blank");
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-500 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl w-full h-full md:h-5/6 flex flex-col overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-custom-paynes-gray text-2xl z-20 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
                    aria-label="Close"
                >
                    <X />
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
                                    <div
                                        key={index}
                                        className={`relative w-12 h-12 rounded-full cursor-pointer border-2 transition-all duration-200
    ${selectedImageIndex === index ? 'border-custom-amber' : 'border-transparent'}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <Image
                                            src={imgUrl}
                                            alt={`${artwork.title} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>


                                ))}
                            </div>
                        )}

                        {/* Artwork Details */}
                        <h2 className="text-4xl font-bold text-custom-paynes-gray my-2">{artwork.title}</h2>
                        <p className="text-sm text-gray-600 my-2">by {artwork.artistName}</p>
                        <p className="text-sm my-5">{artwork.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm border border-gray-200 rounded-xl p-3">
                            <div>
                                <span className="text-gray-500">Dimensions</span>
                                <p className="text-gray-800 font-medium">{artwork.dimension}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Medium</span>
                                <p className="text-gray-800 font-medium">{artwork.medium}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Price</span>
                                <p className="text-gray-800 font-medium">INR. {artwork.price}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 my-5 justify-between">
                            <button
                                className={`flex items-center space-x-2 text-md font-bold rounded-full transition-colors duration-300`}
                            >
                                <Heart
                                    onClick={toggleLike}
                                    size={24}
                                    className={`cursor-pointer transition-colors ${isLiked ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-current"}`}
                                />
                            </button>
                            <button
                                className="flex items-center gap-2 cursor-pointer border border-custom-amber text-custom-amber font-bold py-2 px-5 rounded-full hover:bg-custom-amber hover:text-white transition"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button
                                className="flex items-center gap-2 cursor-pointer bg-custom-amber text-white font-bold py-2 px-5 rounded-full shadow-md hover:opacity-90 transition"
                            >
                                Buy Now
                            </button>
                        </div>


                        <div className="mt-8 flex justify-end">
                            <div className="flex items-center gap-4">
                                <FaWhatsapp
                                    size={24}
                                    className="text-gray-700 cursor-pointer"
                                    onClick={shareOnWhatsApp}
                                />
                                <Copy
                                    size={24}
                                    className="text-gray-600 cursor-pointer"
                                    onClick={copyUrl}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

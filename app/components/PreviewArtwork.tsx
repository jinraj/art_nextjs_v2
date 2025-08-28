import { Heart, ShoppingCart, Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "../stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const PreviewArtwork = ({ artwork, onClose }) => {
    const Router = useRouter();
    const { addItem } = useCartStore();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(artwork.likes);

    // NEW: button states
    const [addState, setAddState] = useState<"idle" | "adding" | "added">("idle");
    const [buyState, setBuyState] = useState<"idle" | "processing">("idle");

    const mainImageUrl = artwork.images[selectedImageIndex];

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const shareOnWhatsApp = () => {
        const url = `https://api.whatsapp.com/send?text=Checkoutthisartwork:${window.location.href}`;
        window.open(url, "_blank");
    };

    const toggleLike = () => {
        setIsLiked((s) => !s);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const handleAddToCart = async () => {
        if (addState !== "idle") return;
        try {
            setAddState("adding");
            await addItem(artwork);
            setAddState("added");
            // brief “success” flash then settle back to idle
            setTimeout(() => setAddState("idle"), 1200);
        } catch (e) {
            setAddState("idle");
            console.error(e);
        }
    };

    const handleBuyNow = async () => {
        if (buyState !== "idle") return;
        setBuyState("processing");
        // TODO: replace with your checkout flow (create order, redirect, etc.)
        // simulate a short processing step
        setTimeout(() => {
            setBuyState("idle");
            Router.push('/checkout')
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-500 bg-black/80 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl w-full h-full md:h-5/6 flex flex-col overflow-hidden">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 rounded-full p-2 text-custom-paynes-gray bg-white hover:bg-gray-200 transition-colors"
                    aria-label="Close"
                >
                    <X />
                </button>

                <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                    {/* Left: Image */}
                    <div className="relative w-full md:w-3/5 flex-shrink-0 flex items-center justify-center">
                        <img src={mainImageUrl} alt={artwork.title} className="w-full h-full object-contain" />
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-2/5 p-8 flex flex-col">
                        {/* Thumbnails */}
                        {artwork.images.length > 1 && (
                            <div className="flex justify-start items-center gap-2 mb-4 overflow-x-auto p-2">
                                {artwork.images.map((imgUrl, index) => (
                                    <div
                                        key={index}
                                        className={`relative w-12 h-12 rounded-full cursor-pointer border-2 transition-all duration-200 ${selectedImageIndex === index ? "border-custom-amber" : "border-transparent"
                                            }`}
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

                        {/* Artwork Info */}
                        <h2 className="text-4xl font-bold text-custom-paynes-gray my-2">{artwork.title}</h2>
                        <p className="text-sm text-gray-600 my-2">by {artwork.artist.name}</p>
                        <p className="text-sm my-5">{artwork.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm border border-gray-200 rounded-xl p-3">
                            <div>
                                <span className="text-gray-500">Dimensions</span>
                                <p className="text-gray-800 font-medium">{artwork.dimensions}</p>
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

                        {/* Actions */}
                        <div className="flex gap-4 my-5 justify-between items-stretch">
                            {/* Like */}
                            <button
                                className="flex items-center space-x-2 text-md font-bold rounded-full"
                                onClick={toggleLike}
                                aria-pressed={isLiked}
                            >
                                <Heart
                                    size={24}
                                    className={`transition-colors ${isLiked ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-current"}`}
                                />
                            </button>

                            <button
                                onClick={handleAddToCart}
                                disabled={addState === "adding"}
                                className="flex items-center justify-center gap-2 bg-white border border-custom-amber text-custom-amber font-semibold py-2 px-5 rounded-4xl shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
                            >
                                {addState === "adding" ? "Adding..." : (
                                    <>
                                        <ShoppingCart size={18} /> Add to Cart
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleBuyNow}
                                disabled={buyState === "processing"}
                                className="flex items-center justify-center gap-2 bg-custom-amber text-white font-semibold py-2 px-5 rounded-4xl shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
                            >
                                {buyState === "processing" ? "Processing..." : "Buy Now"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

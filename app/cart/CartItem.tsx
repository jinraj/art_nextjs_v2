import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Cart } from "@prisma/client";


interface CartItemProps {
    item: Cart & { artwork: { title: string; price: number; images: string[] } };
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const [formattedPrice, setFormattedPrice] = useState<string>(item.artwork.price.toString());

    useEffect(() => {
        setFormattedPrice(item.artwork.price.toLocaleString('en-IN'));
    }, [item.artwork.price]);

    return (
        <div className="flex flex-row space-x-5 items-center border-b border-[var(--custom-silver)] py-6">
            <div className="w-1/3 md:w-1/5 flex-shrink-0">
                <Image
                    src={item.artwork.images[0]}
                    alt={item.artwork.title}
                    width={70}
                    height={120}
                    className="w-full h-50 md:h-48 object-cover rounded-xl shadow-lg"
                />
            </div>

            <div className="flex-1">
                <div>
                    <h3 className="text-sm text-custom-paynes-gray">{item.artwork.title}</h3>
                    {/* no artist field in API, skipping */}
                </div>
                <div className="text-md font-semibold text-custom-paynes-gray my-5">
                    INR.{formattedPrice}
                </div>

                <div className="flex mt-4">
                    <div className="flex items-center space-x-2 border border-[var(--custom-silver)] rounded-full px-5 py-3">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="text-custom-silver cursor-pointer hover:text-custom-paynes-gray disabled:opacity-50"
                        >
                            <Minus size={20} />
                        </button>
                        <span className="text-sm font-semibold text-custom-paynes-gray w-6 text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-custom-silver cursor-pointer hover:text-custom-paynes-gray"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 cursor-pointer hover:text-red-700 font-medium text-sm ml-6 sm:ml-10"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};
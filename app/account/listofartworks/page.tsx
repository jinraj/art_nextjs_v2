"use client";

import { useState } from "react";
import { X, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField";

// ---------------------- Zod Schema for Editing ----------------------
const artworkEditSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  medium: z.string().min(2),
  dimensions: z.string().min(2),
  artist: z.string().min(2),
  price: z.number(),
  artType: z.enum(["Paintings", "Photography", "Decors"]),
  isHidden: z.boolean(),
  isSold: z.boolean(),
});

type ArtworkEditForm = z.infer<typeof artworkEditSchema>;

// ---------------------- Mock Data ----------------------
interface Artwork {
  id: number;
  title: string;
  artType: "Paintings" | "Photography" | "Decors";
  description: string;
  images: string[];
  dimensions: string;
  medium: string;
  artist: string;
  price: number;
  isHidden: boolean;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockArtworks: Artwork[] = [
  {
    id: 1,
    title: "Sunset Bliss",
    artType: "Paintings",
    description: "A beautiful sunset over the mountains.",
    images: ["/resources/sample1.jpg", "/resources/sample2.jpg"],
    dimensions: "24x36",
    medium: "Oil on Canvas",
    artist: "John Doe",
    price: 500,
    isHidden: false,
    isSold: false,
    createdAt: "2025-08-16",
    updatedAt: "2025-08-16",
  },
  {
    id: 2,
    title: "City Lights",
    artType: "Photography",
    description: "Night photography of city skyline.",
    images: ["/resources/sample3.jpg"],
    dimensions: "20x30",
    medium: "Digital Print",
    artist: "Jane Smith",
    price: 300,
    isHidden: false,
    isSold: true,
    createdAt: "2025-08-14",
    updatedAt: "2025-08-15",
  },
];

// ---------------------- Component ----------------------
export default function ListOfArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<ArtworkEditForm>({
    resolver: zodResolver(artworkEditSchema),
  });

  const startEditing = (artwork: Artwork) => {
    setEditingId(artwork.id);
    reset({ ...artwork });
  };

  const saveEdit = (data: ArtworkEditForm) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === editingId ? { ...art, ...data, updatedAt: new Date().toISOString() } : art))
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const deleteArtwork = (id: number) => {
    setArtworks((prev) => prev.filter((art) => art.id !== id));
  };

  return (
    <div className="p-8 py-25 min-h-screen font-[Poppins]">
      <h1 className="text-2xl font-bold text-center text-custom-paynes-gray mb-6">
          List of Artworks
        </h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-custom-paynes-gray text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Art Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Dimensions (in)</th>
              <th className="px-4 py-2">Medium</th>
              <th className="px-4 py-2">Artist</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Hidden</th>
              <th className="px-4 py-2">Sold</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Modified</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((art) => (
              <tr key={art.id} className="border-b text-sm">
                {editingId === art.id ? (
                  <>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField {...register("title")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <select {...register("artType")} className="text-sm text-custom-paynes-gray border border-slate-700 rounded p-1">
                        <option value="Paintings">Paintings</option>
                        <option value="Photography">Photography</option>
                        <option value="Decors">Decors</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField {...register("description")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray flex gap-2">
                      {art.images.map((src, idx) => (
                        <div key={idx} className="w-16 h-16 relative rounded overflow-hidden border">
                          <Image src={src} alt={`Artwork ${idx}`} fill className="object-cover" />
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField {...register("dimensions")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField {...register("medium")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField {...register("artist")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">
                      <InputField type="number" {...register("price", { valueAsNumber: true })} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray text-center">
                      <input type="checkbox" {...register("isHidden")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray text-center">
                      <input type="checkbox" {...register("isSold")} />
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.createdAt}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.updatedAt}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray flex gap-2">
                      <button type="button" onClick={handleSubmit(saveEdit)} className="px-2 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                      <button type="button" onClick={cancelEdit} className="px-2 py-1 bg-gray-400 text-white rounded text-sm">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.title}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.artType}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.description}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray flex gap-2">
                      {art.images.map((src, idx) => (
                        <div key={idx} className="w-16 h-16 relative rounded overflow-hidden border">
                          <Image src={src} alt={`Artwork ${idx}`} fill className="object-cover" />
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.dimensions}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.medium}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.artist}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.price}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray text-center">{art.isHidden ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray text-center">{art.isSold ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.createdAt}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray">{art.updatedAt}</td>
                    <td className="px-4 py-2 text-custom-paynes-gray flex gap-2">
                      <button onClick={() => startEditing(art)} className="p-1 bg-blue-500 text-white rounded text-sm"><Edit size={16} /></button>
                      <button onClick={() => deleteArtwork(art.id)} className="p-1 bg-red-500 text-white rounded text-sm"><Trash size={16} /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

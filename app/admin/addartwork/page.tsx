"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField";
import { X } from "lucide-react";

// ---------------------- Zod Schema ----------------------
const artworkSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  medium: z.string().min(2, "Medium is required"),
  dimensions: z.string().min(2, "Dimensions are required"),
  artist: z.string().min(2, "Artist is required"),
  price: z.number({ error: "Price must be a number" }),
  artType: z.enum(["Paintings", "Photography", "Decors"], "Select an artwork type"),
  images: z
    .any()
    .refine((files) => files?.length > 0, "At least one image is required"),
  isHidden: z.boolean().optional().default(false),
  isSold: z.boolean().optional().default(false),
});

type ArtworkFormInputs = z.infer<typeof artworkSchema>;

// ---------------------- Component ----------------------
export default function AddArtwork() {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ArtworkFormInputs>({
    resolver: zodResolver(artworkSchema),
  });

  const onSubmit = async (data: ArtworkFormInputs) => {
    setLoading(true);
    console.log("Files:", selectedFiles);
    console.log("Artwork Data:", data);
    setLoading(false);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const urls = filesArray.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...filesArray]);
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const isHidden = watch("isHidden");
  const isSold = watch("isSold");

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins] py-12">
      <div className="rounded-2xl p-8 w-[95%] max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          Add New Artwork
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

          {/* Art Type Dropdown */}
          <div>
            <select
              {...register("artType")}
              defaultValue=""
              className="w-full border border-slate-200 rounded-xl p-3 text-custom-paynes-gray text-sm focus:ring-2 focus:ring-custom-amber focus:outline-none"
            >
              <option value="" disabled className="text-custom-paynes-gray">
                Artwork Type
              </option>
              <option value="Paintings" className="text-custom-paynes-gray text-sm">Paintings</option>
              <option value="Photography" className="text-custom-paynes-gray text-sm">Photography</option>
              <option value="Decors" className="text-custom-paynes-gray text-sm">Decors</option>
            </select>
            {errors.artType && <p className="text-red-500 text-xs mt-1">{errors.artType.message}</p>}
          </div>

          <InputField placeholder="Title" {...register("title")} error={errors.title?.message} />
          <InputField placeholder="Description" {...register("description")} error={errors.description?.message} />
          <InputField placeholder="Medium" {...register("medium")} error={errors.medium?.message} />
          <InputField placeholder="Dimensions" {...register("dimensions")} error={errors.dimensions?.message} />
          <InputField placeholder="Artist" {...register("artist")} error={errors.artist?.message} />
          <InputField
            type="number"
            placeholder="Price"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
          />

          {/* File Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              onChange={handleFilesChange}
              className="w-full border border-slate-200 rounded-xl px-3 py-3 text-custom-paynes-gray text-sm placeholder:text-custom-paynes-gray focus:ring-2 focus:ring-custom-amber focus:outline-none"
            />
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}

            {/* Thumbnails */}
            {previewUrls.length > 0 && (
              <div className="flex gap-3 mt-2 flex-wrap">
                {previewUrls.map((src, index) => (
                  <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                    <img src={src} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>

                ))}
              </div>
            )}
          </div>

          {/* isHidden & isSold */}
          <div className="flex items-center gap-6 mt-2 text-sm">
            <label className="flex items-center gap-2 text-custom-paynes-gray">
              <input type="checkbox" {...register("isHidden")} checked={isHidden} className="h-3 w-3" />
              Hidden
            </label>
            <label className="flex items-center gap-2 text-custom-paynes-gray">
              <input type="checkbox" {...register("isSold")} checked={isSold} className="h-3 w-3" />
              Sold
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold transition hover:scale-105 active:scale-95 mt-4"
          >
            {loading ? "Saving..." : "Add Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
}

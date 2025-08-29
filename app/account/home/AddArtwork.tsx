'use client';

import { useEffect, useState } from "react";
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
    price: z
        .number()
        .refine((v) => Number.isFinite(v), { message: "Price must be a number" })
        .refine((v) => v > 0, { message: "Price must be greater than 0" }),
    artType: z.enum(["Paintings", "Photography", "Decors"]),
    images: z
        .any()
        .refine(
            (files: FileList | File[] | null) =>
                !!files && (Array.isArray(files) ? files.length > 0 : files.length > 0),
            "At least one image is required"
        ),

    // ✅ Make them required booleans with defaults
    isHidden: z.boolean(),
    isSold: z.boolean(),
});


type ArtworkFormInputs = z.infer<typeof artworkSchema>;

// ---------------------- Component ----------------------
export default function AddArtwork() {
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        resetField,
    } = useForm<z.infer<typeof artworkSchema>>({
        resolver: zodResolver(artworkSchema),
        defaultValues: { isHidden: false, isSold: false }, // safe now
    });

    // keep RHF in sync when we mutate selectedFiles manually
    useEffect(() => {
        // Convert to a FileList-like array for validation
        // RHF stores whatever we set; schema only checks .length
        setValue("images", selectedFiles as any, { shouldValidate: true });
    }, [selectedFiles, setValue]);

    const onSubmit = async (data: ArtworkFormInputs) => {
        if (!selectedFiles.length) {
            // ensure validation message shows if user removed all images
            setValue("images", [] as any, { shouldValidate: true });
            return;
        }

        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("artType", data.artType);
            fd.append("title", data.title);
            fd.append("description", data.description);
            fd.append("dimensions", data.dimensions);
            fd.append("medium", data.medium);
            fd.append("price", String(data.price));
            if (data.isHidden) fd.append("isHidden", "on");
            if (data.isSold) fd.append("isSold", "on");

            for (const file of selectedFiles) {
                fd.append("images", file);
            }

            const res = await fetch("/api/artworks", {
                method: "POST",
                body: fd, // <-- do NOT set Content-Type manually
            });

            const result = await res.json().catch(() => ({}));
            if (!res.ok) {
                alert(result.error || "Add Artwork failed.");
                return;
            }

            // success UX: clear form & previews
            setSelectedFiles([]);
            setPreviewUrls([]);
            resetField("title");
            resetField("description");
            resetField("medium");
            resetField("dimensions");
            resetField("price");
            resetField("artType");
            resetField("isHidden");
            resetField("isSold");
            resetField("images");
            alert("Artwork added successfully!");
        } catch (error) {
            console.error("Error submitting artwork:", error);
            alert("Something went wrong while adding the artwork.");
        } finally {
            setLoading(false);
        }
    };

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const urls = filesArray.map((file) => URL.createObjectURL(file));

        setSelectedFiles((prev) => [...prev, ...filesArray]);
        setPreviewUrls((prev) => [...prev, ...urls]);

        // also reflect in RHF so Zod sees them
        setValue("images", [...selectedFiles, ...filesArray] as any, { shouldValidate: true });
        // reset the input value so same file can be selected again if needed
        e.currentTarget.value = "";
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    };

    // revoke blob URLs on unmount
    useEffect(() => {
        return () => {
            previewUrls.forEach((u) => URL.revokeObjectURL(u));
        };
    }, [previewUrls]);

    const isHidden = watch("isHidden");
    const isSold = watch("isSold");

    return (
        <div className="max-w-lg mx-auto">
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
                        <option value="Paintings" className="text-custom-paynes-gray text-sm">
                            Paintings
                        </option>
                        <option value="Photography" className="text-custom-paynes-gray text-sm">
                            Photography
                        </option>
                        <option value="Decors" className="text-custom-paynes-gray text-sm">
                            Decors
                        </option>
                    </select>
                    {errors.artType && <p className="text-red-500 text-xs mt-1">{String(errors.artType.message)}</p>}
                </div>

                <InputField placeholder="Title" {...register("title")} error={errors.title?.message} />
                <InputField placeholder="Description" {...register("description")} error={errors.description?.message} />
                <InputField placeholder="Medium" {...register("medium")} error={errors.medium?.message} />
                <InputField placeholder="Dimensions" {...register("dimensions")} error={errors.dimensions?.message} />
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
                        onChange={handleFilesChange}
                        className="w-full border border-slate-200 rounded-xl px-3 py-3 text-custom-paynes-gray text-sm placeholder:text-custom-paynes-gray focus:ring-2 focus:ring-custom-amber focus:outline-none"
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{String(errors.images.message)}</p>}

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
                                        aria-label={`Remove image ${index + 1}`}
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
                        <input type="checkbox" {...register("isHidden")} checked={!!isHidden} onChange={(e) => setValue("isHidden", e.target.checked)} className="h-3 w-3" />
                        Hidden
                    </label>
                    <label className="flex items-center gap-2 text-custom-paynes-gray">
                        <input type="checkbox" {...register("isSold")} checked={!!isSold} onChange={(e) => setValue("isSold", e.target.checked)} className="h-3 w-3" />
                        Sold
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold transition hover:scale-105 active:scale-95 mt-4 disabled:opacity-60"
                >
                    {loading ? "Saving..." : "Add Artwork"}
                </button>
            </form>
        </div>
    );
}

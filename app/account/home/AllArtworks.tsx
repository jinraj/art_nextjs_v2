'use client';

import { useState, useMemo } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Artwork, Role } from "@prisma/client";
import { ArrowUp, ArrowDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArtworkWithArtist = Artwork & {
  artist: {
    name: string;
  };
};

interface AllArtworksProps {
  displayArtworks: ArtworkWithArtist[];
  currentUser: {
    role: Role;
  };
}

type SortKey = keyof Omit<ArtworkWithArtist, 'artist' | 'images' | 'description'>;

interface SortConfig {
  key: SortKey;
  direction: 'asc' | 'desc';
}

export default function AllArtworks({ displayArtworks, currentUser }: AllArtworksProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Handle sort toggling
  const requestSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedArtworks = useMemo(() => {
    if (!sortConfig) return displayArtworks;

    return [...displayArtworks].sort((a, b) => {
      // This assertion is safe because SortKey is constrained
      const aValue = a[sortConfig.key as keyof Artwork] as any;
      const bValue = b[sortConfig.key as keyof Artwork] as any;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Check specifically if both values are valid dates before attempting to sort
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // You'll need to handle boolean sorting as well
      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        const boolA = aValue ? 1 : 0;
        const boolB = bValue ? 1 : 0;
        return sortConfig.direction === "asc" ? boolA - boolB : boolB - boolA;
      }

      // Fallback for strings
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [displayArtworks, sortConfig]);

  // Sortable header with conditional icon
  const SortableHeader = ({ columnKey, children }: { columnKey: SortKey, children: React.ReactNode }) => {
    const isSorted = sortConfig?.key === columnKey;
    const direction = sortConfig?.direction;

    return (
      <TableHead
        onClick={() => requestSort(columnKey)}
        className="cursor-pointer select-none"
      >
        <span className="inline-flex items-center space-x-1">
          <span>{children}</span>
          {isSorted && (direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
        </span>
      </TableHead>
    );
  };

  return (
    <div>
      {displayArtworks && displayArtworks.length > 0 ? (
        <Table className=" w-full">
          <TableHeader>
            <TableRow>
              <SortableHeader columnKey="id">ID</SortableHeader>
              <SortableHeader columnKey="artType">ArtType</SortableHeader>
              <SortableHeader columnKey="title">Title</SortableHeader>
              <TableHead>Description</TableHead>
              <TableHead>Images</TableHead>
              <SortableHeader columnKey="dimensions">Dimensions</SortableHeader>
              <SortableHeader columnKey="medium">Medium</SortableHeader>
              <SortableHeader columnKey="price">Price</SortableHeader>
              {currentUser?.role === Role.Admin && (
                <TableHead>Artist</TableHead> // Cannot sort by 'artistName' directly, so change to a standard TableHead
              )}
              <SortableHeader columnKey="likes">Likes</SortableHeader>
              <SortableHeader columnKey="isHidden">Hidden</SortableHeader>
              <SortableHeader columnKey="isSold">Sold</SortableHeader>
              <SortableHeader columnKey="createdAt">CreatedAt</SortableHeader>
              <SortableHeader columnKey="updatedAt">UpdatedAt</SortableHeader>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedArtworks.map((artwork) => (
              <TableRow
                key={artwork.id}
                className="transition-transform duration-300 hover:bg-gray-100 text-custom-paynes-gray"
              >
                <TableCell className="font-medium">{artwork.id}</TableCell>
                <TableCell>{artwork.artType}</TableCell>
                <TableCell>{artwork.title}</TableCell>
                <TableCell className="whitespace-normal min-w-xs break-words">
                  {artwork.description}
                </TableCell>
                <TableCell className=" min-w-[120px]">
                  <div className="flex flex-col space-y-2">
                    {artwork.images?.map((img, idx) => {
                      const filename = img.split('/').pop();
                      return (
                        <a
                          key={idx}
                          href={img}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs border rounded-3xl px-1 py-1 hover:bg-gray-100 break-words"
                        >
                          {filename}
                        </a>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell>{artwork.dimensions}</TableCell>
                <TableCell>{artwork.medium}</TableCell>
                <TableCell>Rs.{artwork.price.toFixed(2)}</TableCell>
                {currentUser?.role === Role.Admin && (
                  <TableCell>{artwork.artist.name}</TableCell>
                )}
                <TableCell>{artwork.likes}</TableCell>
                <TableCell>{artwork.isHidden ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {artwork.isSold ? (
                      <span className="text-green-500 flex items-center space-x-1">
                        <span>Sold</span>
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center space-x-1">
                        <span>No</span>
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(artwork.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(artwork.updatedAt).toLocaleDateString()}
                </TableCell>
                {/* Actions */}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => console.log("Edit", artwork.id)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => console.log("Delete", artwork.id)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-custom-silver">No artworks to display.</p>
      )}
    </div>
  );
}
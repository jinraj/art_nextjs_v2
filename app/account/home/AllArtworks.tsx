"use client";

import { useState, useMemo } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Role } from "@prisma/client";
import { CheckCircle, XCircle, ArrowUp, ArrowDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllArtworks({ displayArtworks, currentUser }) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // Handle sort toggling
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted data
  const sortedArtworks = useMemo(() => {
    if (!sortConfig) return displayArtworks;

    return [...displayArtworks].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (aValue instanceof Date || bValue instanceof Date) {
        return sortConfig.direction === "asc"
          ? new Date(aValue).getTime() - new Date(bValue).getTime()
          : new Date(bValue).getTime() - new Date(aValue).getTime();
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [displayArtworks, sortConfig]);

  // Sortable header with conditional icon
  const SortableHeader = ({ columnKey, children }) => {
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
              <SortableHeader columnKey="description">Description</SortableHeader>
              <TableHead>Images</TableHead>
              <SortableHeader columnKey="dimensions">Dimensions</SortableHeader>
              <SortableHeader columnKey="medium">Medium</SortableHeader>
              <SortableHeader columnKey="price">Price</SortableHeader>
              <SortableHeader columnKey="artistName">ArtistName</SortableHeader>
              <SortableHeader columnKey="likes">Likes</SortableHeader>
              <SortableHeader columnKey="isHidden">Hidden</SortableHeader>
              <SortableHeader columnKey="isSold">Sold</SortableHeader>
              <SortableHeader columnKey="createdAt">CreatedAt</SortableHeader>
              <SortableHeader columnKey="updatedAt">UpdatedAt</SortableHeader>
              {currentUser?.role === Role.Admin && (
                <SortableHeader columnKey="artistName">Artist</SortableHeader>
              )}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedArtworks.map((artwork) => (
              <TableRow
                key={artwork.id}
                className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white"
              >
                <TableCell className="font-medium text-custom-paynes-gray">{artwork.id}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.artType}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.title}</TableCell>
                <TableCell className="text-custom-paynes-gray whitespace-normal min-w-xs break-words">
                  {artwork.description}
                </TableCell>
                <TableCell className="text-custom-paynes-gray min-w-[120px]">
                  <div className="flex flex-col space-y-2">
                    {artwork.images?.map((img, idx) => {
                      const filename = img.split('/').pop(); // Extract filename only
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
                <TableCell className="text-custom-paynes-gray">{artwork.dimensions}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.medium}</TableCell>
                <TableCell className="text-custom-paynes-gray">${artwork.price.toFixed(2)}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.artistName}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.likes}</TableCell>
                <TableCell className="text-custom-paynes-gray">{artwork.isHidden ? "Yes" : "No"}</TableCell>
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
                <TableCell className="text-custom-paynes-gray">
                  {new Date(artwork.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-custom-paynes-gray">
                  {new Date(artwork.updatedAt).toLocaleDateString()}
                </TableCell>
                {currentUser?.role === Role.Admin && (
                  <TableCell className="text-custom-paynes-gray">{artwork.artistName}</TableCell>
                )}

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

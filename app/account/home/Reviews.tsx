'use client';

import { useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";

export default function Reviews({ reviews }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedReviews = [...reviews  || []].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    // Convert dates properly
    if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("id")} className="cursor-pointer">ID</TableHead>
              <TableHead onClick={() => handleSort("userId")} className="cursor-pointer">User</TableHead>
              <TableHead onClick={() => handleSort("rating")} className="cursor-pointer">Rating</TableHead>
              <TableHead onClick={() => handleSort("comment")} className="cursor-pointer">Comment</TableHead>
              <TableHead onClick={() => handleSort("createdAt")} className="cursor-pointer">Created</TableHead>
              <TableHead onClick={() => handleSort("updatedAt")} className="cursor-pointer">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReviews.map((review) => (
              <TableRow
                key={review.id}
                className="duration-300 hover:bg-gray-100 text-custom-paynes-gray"
              >
                <TableCell className="font-medium">{review.id}</TableCell>
                <TableCell>{review.userId}</TableCell>
                <TableCell className="font-medium">{review.rating}/5</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{new Date(review.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(review.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No reviews to display.</p>
      )}
    </div>
  );
}

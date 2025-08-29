'use client';

import { useMemo, useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { AppReview, User } from "@prisma/client";

type ReviewWithUser = AppReview & { user: User };

interface AllReviewProps {
  reviews: ReviewWithUser[];
  currentUser: User;
}

type SortableReviewKeys = keyof AppReview;

export default function Reviews({ reviews, currentUser }: AllReviewProps) {
  const [sortConfig, setSortConfig] = useState<{ key: SortableReviewKeys; direction: "asc" | "desc" }>({
    key: "updatedAt",
    direction: "asc",
  });

  const sortedReviews = useMemo(() => {
    if (!reviews) return [];

    const sorted = [...reviews].sort((a, b) => {
      const key = sortConfig.key;
      let aVal: any = a[key];
      let bVal: any = b[key];

      if (key === "createdAt" || key === "updatedAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) {
        return -1;
      }
      if (aVal > bVal) {
        return 1;
      }
      return 0;
    });

    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [reviews, sortConfig]);

  const handleSort = (key: SortableReviewKeys) => {
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // --- Card View for Artist/Customer ---
  if (currentUser?.role !== "Admin") {
    console.log("Current user:", currentUser);
    if (!reviews || reviews.length === 0) {
      return <p>No review to display.</p>;
    }

    const review = reviews[0]; // only one review for Artist/Customer
    return (
      <Card className="max-w-lg mx-auto shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="text-yellow-500 h-5 w-5" />
            {review.rating}/5
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-base whitespace-normal break-words">{review.comment}</p>
          <p className="mt-3 text-xs text-gray-500">
            Last updated: {new Date(review.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    );
  }

  // --- Table View for Admin ---
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
                <TableCell>{review.user?.name}</TableCell>
                <TableCell className="font-medium">{review.rating}/5</TableCell>
                <TableCell className="whitespace-normal min-w-xs break-words">{review.comment}</TableCell>
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

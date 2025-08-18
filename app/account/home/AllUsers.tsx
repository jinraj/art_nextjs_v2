"use client";

import { useState } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function AllUsers({ allUsers }) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // ensure it's always an array
  const users = Array.isArray(allUsers) ? allUsers : [];

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    let valA = a[key];
    let valB = b[key];

    if (valA instanceof Date) valA = valA.getTime();
    if (valB instanceof Date) valB = valB.getTime();

    if (typeof valA === "boolean") valA = valA ? 1 : 0;
    if (typeof valB === "boolean") valB = valB ? 1 : 0;

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      {users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "id",
                "name",
                "email",
                "city",
                "state",
                "country",
                "role",
                "isApproved",
                "approvedAt",
                "createdAt",
                "updatedAt",
              ].map((col) => (
                <TableHead
                  key={col}
                  className="cursor-pointer select-none"
                  onClick={() => handleSort(col)}
                >
                  <div className="flex items-center gap-1">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortConfig?.key === col &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="duration-300 hover:bg-gray-100 text-custom-paynes-gray"
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.isApproved ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {user.approvedAt
                    ? new Date(user.approvedAt).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No users to display.</p>
      )}
    </div>
  );
}

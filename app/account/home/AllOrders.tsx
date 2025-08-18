'use client';

import { useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowUp, ArrowDown } from "lucide-react";
import { OrderStatus } from "@/app/models/artwork";


// ---------- Sort helper ----------
const sortOrders = (orders: any[], key: string, direction: "asc" | "desc") => {
    return [...orders].sort((a, b) => {
        let valA = a[key as keyof typeof a];
        let valB = b[key as keyof typeof b];

        if (valA instanceof Date && valB instanceof Date) {
            return direction === "asc" ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
        }
        if (typeof valA === "number" && typeof valB === "number") {
            return direction === "asc" ? valA - valB : valB - valA;
        }
        if (typeof valA === "string" && typeof valB === "string") {
            return direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
    });
};

// ---------- Component ----------
export default function AllOrders({orders}) {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "orderedAt",
        direction: "desc",
    });

    const handleSort = (key: string) => {
        setSortConfig(prev =>
            prev.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };

    const sortedOrders = sortOrders(orders || [], sortConfig.key, sortConfig.direction);
    
    const renderSortIcon = (key: string) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Order ID {renderSortIcon("id")}
                            </div>
                        </TableHead>

                        <TableHead onClick={() => handleSort("userId")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Ordered By {renderSortIcon("userId")}
                            </div>
                        </TableHead>

                        <TableHead>Artworks - Price x Quantities</TableHead>

                        <TableHead onClick={() => handleSort("totalAmount")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Total Amount {renderSortIcon("totalAmount")}
                            </div>
                        </TableHead>

                        <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Status {renderSortIcon("status")}
                            </div>
                        </TableHead>

                        <TableHead onClick={() => handleSort("orderedAt")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Ordered At {renderSortIcon("orderedAt")}
                            </div>
                        </TableHead>

                        <TableHead onClick={() => handleSort("updatedAt")} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                                Updated At {renderSortIcon("updatedAt")}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>


                <TableBody>
                    {sortedOrders.map(order => (
                        <TableRow
                            key={order.id}
                            className="transition-transform duration-300 hover:bg-gray-100 text-custom-paynes-gray"
                        >
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.userId}</TableCell>

                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    {order.items?.length > 0 && order.items.map(item => (
                                        <span
                                            key={item.id}
                                            className="border px-2 py-1 rounded-3xl whitespace-nowrap"
                                        >
                                            {item.artworkId} <span className="text-slate-400 text-xs">INR.{item.priceAtPurchase.toFixed(2)}</span>{"   "}x{"   "}{item.quantity}
                                        </span>
                                    ))}
                                </div>
                            </TableCell>

                            {/* Total Amount */}
                            <TableCell>
                                INR.{order.totalAmount.toFixed(2)}
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    {order.status === OrderStatus.Pending && (
                                        <span className="text-amber-500 flex items-center space-x-1">
                                            <span>Pending</span>
                                        </span>
                                    )}
                                    {order.status === OrderStatus.Completed && (
                                        <span className="text-green-500 flex items-center space-x-1">
                                            <span>Completed</span>
                                        </span>
                                    )}
                                    {order.status === OrderStatus.Cancelled && (
                                        <span className="text-red-500 flex items-center space-x-1">
                                            <span>Cancelled</span>
                                        </span>
                                    )}
                                </div>
                            </TableCell>

                            {/* Ordered Date */}
                            <TableCell>
                                {new Date(order.orderedAt).toLocaleString()}
                            </TableCell>

                            {/* Updated Date */}
                            <TableCell>
                                {new Date(order.updatedAt).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

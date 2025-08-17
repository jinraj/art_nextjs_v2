'use client';

import { useState } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowUp, ArrowDown } from "lucide-react";
import { OrderStatus } from "@/app/models/artwork";
import { mockOrders } from "@/app/data/mockData";


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
export default function AllOrders() {
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

    const sortedOrders = sortOrders(mockOrders, sortConfig.key, sortConfig.direction);

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
                            Order ID {renderSortIcon("id")}
                        </TableHead>
                        <TableHead onClick={() => handleSort("userId")} className="cursor-pointer">
                            Ordered By {renderSortIcon("userId")}
                        </TableHead>
                        <TableHead>Artworks - Price x Quantities</TableHead>
                        <TableHead onClick={() => handleSort("totalAmount")} className="cursor-pointer">
                            Total Amount {renderSortIcon("totalAmount")}
                        </TableHead>
                        <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                            Status {renderSortIcon("status")}
                        </TableHead>
                        <TableHead onClick={() => handleSort("orderedAt")} className="cursor-pointer">
                            Ordered At {renderSortIcon("orderedAt")}
                        </TableHead>
                        <TableHead onClick={() => handleSort("updatedAt")} className="cursor-pointer">
                            Updated At {renderSortIcon("updatedAt")}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sortedOrders.map(order => (
                        <TableRow
                            key={order.id}
                            className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white"
                        >
                            <TableCell className="font-medium text-custom-paynes-gray">{order.id}</TableCell>
                            <TableCell className="text-custom-paynes-gray">{order.userId}</TableCell>

                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    {order.items.map(item => (
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
                            <TableCell className="text-custom-paynes-gray">
                                ${order.totalAmount.toFixed(2)}
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
                            <TableCell className="text-custom-silver">
                                {format(order.orderedAt, "PPP")}
                            </TableCell>

                            {/* Updated Date */}
                            <TableCell className="text-custom-silver">
                                {format(order.updatedAt, "PPP")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

'use client';

import { useState, useMemo } from "react";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Order, User, OrderStatus, Role, OrderItem, Artwork } from "@prisma/client";


type OrderRow = Order & {
    items: (OrderItem & { artwork?: Pick<Artwork, "title"> | null })[];
    user?: User;
};

type SortableOrderKeys = keyof Omit<OrderRow, 'items' | 'user'>;

interface AllOrdersProps {
    orders: OrderRow[];
    currentUser: User;
}

export default function AllOrders({ orders, currentUser }: AllOrdersProps) {
    const [sortConfig, setSortConfig] = useState<{ key: SortableOrderKeys; direction: "asc" | "desc" }>({
        key: "orderedAt",
        direction: "desc",
    });

    const handleSort = (key: SortableOrderKeys) => {
        setSortConfig(prev =>
            prev.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };

    // Use useMemo to memoize the sorted list
    const sortedOrders = useMemo(() => {
        const sorted = [...orders].sort((a, b) => {
            const key = sortConfig.key;
            const aValue = a[key];
            const bValue = b[key];

            if (aValue instanceof Date && bValue instanceof Date) {
                return aValue.getTime() - bValue.getTime();
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                return aValue - bValue;
            }
            // For OrderStatus (string enum), we can use localeCompare
            if (typeof aValue === "string" && typeof bValue === "string") {
                return aValue.localeCompare(bValue);
            }
            return 0;
        });

        // Apply descending order if needed
        return sortConfig.direction === "desc" ? sorted.reverse() : sorted;
    }, [orders, sortConfig]);

    const renderSortIcon = (key: SortableOrderKeys) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    };

    const showOrderedBy = currentUser.role === Role.Admin;
    const hasOrders = orders && orders.length > 0;

    return (
        <div>
            {hasOrders ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
                                <div className="flex items-center gap-1">Order ID {renderSortIcon("id")}</div>
                            </TableHead>

                            {showOrderedBy && (
                                <TableHead onClick={() => handleSort("userId")} className="cursor-pointer">
                                    <div className="flex items-center gap-1">Ordered By {renderSortIcon("userId")}</div>
                                </TableHead>
                            )}

                            <TableHead>Artworks - Price x Quantities</TableHead>

                            <TableHead onClick={() => handleSort("totalAmount")} className="cursor-pointer">
                                <div className="flex items-center gap-1">Total Amount {renderSortIcon("totalAmount")}</div>
                            </TableHead>

                            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                                <div className="flex items-center gap-1">Status {renderSortIcon("status")}</div>
                            </TableHead>

                            <TableHead onClick={() => handleSort("orderedAt")} className="cursor-pointer">
                                <div className="flex items-center gap-1">Ordered At {renderSortIcon("orderedAt")}</div>
                            </TableHead>

                            <TableHead onClick={() => handleSort("updatedAt")} className="cursor-pointer">
                                <div className="flex items-center gap-1">Updated At {renderSortIcon("updatedAt")}</div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedOrders.map(order => (
                            <TableRow key={order.id} className="transition-transform duration-300 hover:bg-gray-100 text-custom-paynes-gray">
                                <TableCell>{order.id}</TableCell>
                                {showOrderedBy && <TableCell>{order.userId}</TableCell>}
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        {order.items?.length > 0 && order.items.map(item => (
                                            <span
                                                key={item.id}
                                                className="border px-2 py-1 rounded-3xl whitespace-nowrap"
                                            >
                                                {item.artwork?.title || item.artworkId} <span className="text-slate-400 text-xs">INR.{item.priceAtPurchase.toFixed(2)}</span>{" "}x{" "}{item.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>INR.{order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        {order.status === OrderStatus.Pending && (<span className="text-amber-500">Pending</span>)}
                                        {order.status === OrderStatus.Completed && (<span className="text-green-500">Completed</span>)}
                                        {order.status === OrderStatus.Cancelled && (<span className="text-red-500">Cancelled</span>)}
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(order.orderedAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(order.updatedAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No orders to display.</p>
            )}
        </div>
    );
}
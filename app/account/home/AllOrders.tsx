import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { format } from 'date-fns';
import { User, ArtWork, Order, AppReview, Role, OrderStatus } from '@/app/models/artwork';
import { CheckCircle, Loader2, XCircle } from "lucide-react";


export default function AllOrders({displayOrders}) {
    return (
        <div>
            {displayOrders && displayOrders.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayOrders.map(order => (
                            <TableRow key={order.id} className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white">
                                <TableCell className="font-medium text-custom-paynes-gray">{order.id}</TableCell>
                                <TableCell className="text-custom-paynes-gray">${order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        {order.status === OrderStatus.Pending && <span className="text-amber-500 flex items-center space-x-1"><Loader2 size={16} className="animate-spin" /><span>Pending</span></span>}
                                        {order.status === OrderStatus.Completed && <span className="text-green-500 flex items-center space-x-1"><CheckCircle size={16} /><span>Completed</span></span>}
                                        {order.status === OrderStatus.Cancelled && <span className="text-red-500 flex items-center space-x-1"><XCircle size={16} /><span>Cancelled</span></span>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-custom-silver">{format(order.orderedAt, 'PPP')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-custom-silver">No orders to display.</p>
            )}
        </div>

    );
}
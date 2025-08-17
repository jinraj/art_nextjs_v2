import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";

export default function Reviews({reviews}) {
    return (
        <div>
            {reviews && reviews.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rating</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map(review => (
                            <TableRow key={review.id} className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white">
                                <TableCell className="font-medium text-custom-paynes-gray">{review.rating}/5</TableCell>
                                <TableCell className="text-custom-silver">{review.comment}</TableCell>
                                <TableCell className="text-custom-silver">{format(review.createdAt, 'PPP')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-custom-silver">No reviews to display.</p>
            )}
        </div>
    );
}
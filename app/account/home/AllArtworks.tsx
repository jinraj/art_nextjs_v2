import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Role } from "@prisma/client";
import { CheckCircle, XCircle } from "lucide-react";

export default function AllArtworks({ displayArtworks, currentUser }) {
    return (
        <div>
            {displayArtworks && displayArtworks.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            {currentUser?.role === Role.Admin && <TableHead>Artist</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayArtworks.map(artwork => (
                            <TableRow key={artwork.id} className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white">
                                <TableCell className="font-medium text-custom-paynes-gray">{artwork.title}</TableCell>
                                <TableCell className="text-custom-paynes-gray">${artwork.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        {artwork.isSold ? (
                                            <span className="text-red-500 flex items-center space-x-1"><XCircle size={16} /><span>Sold</span></span>
                                        ) : (
                                            <span className="text-green-500 flex items-center space-x-1"><CheckCircle size={16} /><span>Available</span></span>
                                        )}
                                    </div>
                                </TableCell>
                                {currentUser?.role === Role.Admin && <TableCell className="text-custom-silver">{artwork.artistName}</TableCell>}
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
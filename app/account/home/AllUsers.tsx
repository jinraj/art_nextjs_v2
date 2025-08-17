import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";

export default function AllUsers({ allUsers }) {
    return (
        <div>
            {allUsers && allUsers.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers.map(user => (
                            <TableRow key={user.id} className="transition-transform duration-300 hover:scale-[1.01] hover:bg-custom-antiflash-white">
                                <TableCell className="font-medium text-custom-paynes-gray">{user.name}</TableCell>
                                <TableCell className="text-custom-silver">{user.email}</TableCell>
                                <TableCell className="font-medium text-custom-paynes-gray">{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-custom-silver">No users to display.</p>
            )}
        </div>
    );
}
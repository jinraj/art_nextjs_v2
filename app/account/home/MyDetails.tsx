import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyDetails({currentUser}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-custom-antiflash-white/50">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-custom-paynes-gray">
                    <p className="text-sm"><span className="font-bold">Name:</span> {currentUser.name}</p>
                    <p className="text-sm"><span className="font-bold">Email:</span> {currentUser.email}</p>
                    <p className="text-sm"><span className="font-bold">Role:</span> {currentUser.role}</p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-custom-antiflash-white/50">
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-custom-paynes-gray">
                    <p className="text-sm"><span className="font-bold">City:</span> {currentUser.city}</p>
                    <p className="text-sm"><span className="font-bold">State:</span> {currentUser.state}</p>
                    <p className="text-sm"><span className="font-bold">Country:</span> {currentUser.country}</p>
                </CardContent>
            </Card>
        </div>
    );
}
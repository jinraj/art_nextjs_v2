import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from '../../models/artwork';

export default function MyDetails({currentUser}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-custom-antiflash-white/50">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">Name:</span> {currentUser.name}</p>
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">Email:</span> {currentUser.email}</p>
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">Role:</span> {currentUser.role}</p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-custom-antiflash-white/50">
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">City:</span> {currentUser.city}</p>
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">State:</span> {currentUser.state}</p>
                    <p className="text-sm text-custom-silver"><span className="font-bold text-custom-paynes-gray">Country:</span> {currentUser.country}</p>
                </CardContent>
            </Card>
        </div>
    );
}
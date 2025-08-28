import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { Role } from "@prisma/client";


export async function DELETE(request: NextRequest, context: any) {
    try {
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        const userId = context.params?.id;
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Only admins can delete users
        if (session.user?.role !== Role.Admin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        try {
            const deleted = await prisma.user.delete({ where: { id: userId } });
            return NextResponse.json(deleted, { status: 200 });
        } catch (e: any) {
            if (e?.code === "P2025") {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            console.error("Error deleting user:", e);
            return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error deleting user (auth):", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest, context: any) {
    try {
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        const userId = context.params?.id;
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const updates = await request.json();

        // Fetch existing user for approval logic + ownership checks
        const existing = await prisma.user.findUnique({ where: { id: userId } });
        if (!existing) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const actingUserId = session.user?.id as string | undefined;
        const isSelf = actingUserId && actingUserId === userId;

        // Guard fields:
        // - Self can update profile fields (name, address, city, state, country, landmark)
        // - Only admin can change role, isApproved, approvedAt (approvedAt managed server-side)
        const data: any = {};

        if (typeof updates.name === "string") data.name = updates.name;
        if (typeof updates.address === "string") data.address = updates.address;
        if (typeof updates.landmark === "string") data.landmark = updates.landmark;
        if (typeof updates.city === "string") data.city = updates.city;
        if (typeof updates.state === "string") data.state = updates.state;
        if (typeof updates.country === "string") data.country = updates.country;

        if (session.user?.role === Role.Admin) {
            if (typeof updates.role === "string") data.role = updates.role; // "Customer" | "Artist" | "Admin"

            if (typeof updates.isApproved === "boolean") {
                data.isApproved = updates.isApproved;

                // Manage approvedAt from server state transitions
                const wasApproved = !!existing.isApproved;
                const willBeApproved = updates.isApproved;

                if (!wasApproved && willBeApproved) {
                    data.approvedAt = new Date();
                } else if (wasApproved && !willBeApproved) {
                    data.approvedAt = null;
                }
            }
            // ignore client-sent approvedAt; server controls it
        } else {
            // Non-admins cannot change role/approval
            if (!isSelf) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
            if ("role" in updates || "isApproved" in updates || "approvedAt" in updates) {
                return NextResponse.json({ error: "Not allowed to modify role/approval" }, { status: 403 });
            }
        }

        // No-op protection
        if (Object.keys(data).length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        try {
            const updated = await prisma.user.update({
                where: { id: userId },
                data,
            });
            return NextResponse.json(updated, { status: 200 });
        } catch (e: any) {
            if (e?.code === "P2025") {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            console.error("Error updating user:", e);
            return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating user (auth):", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

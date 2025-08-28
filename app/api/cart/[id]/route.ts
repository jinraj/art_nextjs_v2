// --------------------
// DELETE /api/carts → remove item from cart

import { authenticateRequestBySession } from "@/app/auth/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
        }

        await prisma.cart.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Cart item deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting cart:", error);
        return NextResponse.json({ error: "Failed to delete cart" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        console.log("Creating cart item...");
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        const { artworkId, quantity } = await request.json();
        if (!artworkId) {
            return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 });
        }

        // Before creating, check if item already exists in cart
        console.log("Checking for existing cart item...");
        const existingItem = await prisma.cart.findFirst({
            where: { artworkId, cartedById: session.user.id, status: "Active" },
        });

        if (existingItem) {
            console.log("Item already in cart, updating quantity...");
            const updated = await prisma.cart.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + (quantity ?? 1) },
                include: {
                    artwork: true,
                },
            });
            return NextResponse.json(updated, { status: 200 });
        }

        const cart = await prisma.cart.create({
            data: {
                artworkId,
                cartedById: session.user.id,
                quantity: quantity ?? 1,
            },
            include: {
                artwork: true,
            },
        });
        return NextResponse.json(cart, { status: 201 });
    } catch (error) {
        console.error("Error creating cart:", error);
        return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log("Updating cart item...");
        const session = await authenticateRequestBySession();
        if (session instanceof NextResponse) return session;

        const { quantity, status } = await request.json();
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
        }

        const updatedCart = await prisma.cart.updateMany({
            where: { id: id, cartedById: session.user.id },
            data: {
                ...(quantity !== undefined && { quantity }),
                ...(status && { status }),
            },
        });
        console.log("Cart item updated:", updatedCart.count, "items");
        if (updatedCart.count === 0) {
            return NextResponse.json({ error: "Cart item not found or not yours" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
}
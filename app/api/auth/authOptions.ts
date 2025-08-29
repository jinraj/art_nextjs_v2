import NextAuth, { DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/prisma/client";
import type { Role, User as PrismaUser } from "@prisma/client";

// ---- Module augmentation (keeps your shapes) ----
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: Role;
            city: string | null;
            state: string | null;
            country: string | null;
            isApproved: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: Role;
        city: string | null;
        state: string | null;
        country: string | null;
        isApproved: boolean;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            id: "domain-login",
            name: "Login",
            credentials: {
                email: { label: "Email ID", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No user account found with this email");
                }

                // You said the DB stores base64 string of the real bcrypt hash
                const hashedPassword = Buffer.from(user.password, "base64").toString("utf8");
                const isValid = await compare(credentials.password, hashedPassword);
                if (!isValid) {
                    throw new Error("Invalid password");
                }

                if (!user.verifiedAt) {
                    throw new Error("Email Unverified");
                }

                if (!user.isApproved) {
                    throw new Error("Account is not approved yet");
                }

                // Return the Prisma user (NextAuth will pick needed fields)
                // Optionally return a narrowed object if you prefer:
                // const { id, name, email, role, city, state, country, isApproved } = user;
                // return { id, name, email, role, city, state, country, isApproved } as any;
                return user as unknown as PrismaUser;
            },
        }),
    ],

    callbacks: {
        // Do NOT annotate params; let NextAuth types flow in
        async jwt({ token, user }) {
            if (user) {
                const u = user as PrismaUser;
                token.id = u.id;
                token.role = u.role;
                token.email = u.email;
                token.name = u.name;
                token.city = u.city;
                token.state = u.state;
                token.country = u.country;
                token.isApproved = u.isApproved;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as Role;
                session.user.email = (token as any).email as string;
                session.user.name = (token as any).name as string;
                session.user.city = (token as any).city as string | null;
                session.user.state = (token as any).state as string | null;
                session.user.country = (token as any).country as string | null;
                session.user.isApproved = token.isApproved as boolean;
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
        maxAge: 5 * 60, // 5 mins
    },

    secret: process.env.AUTH_SECRET,
};
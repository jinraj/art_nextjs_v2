
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { DefaultSession, Session, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { prisma } from "@/prisma/client";
import { User } from "@/app/models/artwork";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "domain-login",
            name: 'Login',
            credentials: {
                email: { label: "Email ID", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error("No user account found with this email");
                }

                if (!user.isApproved) {
                    throw new Error("Account is not approved yet");
                }

                const hashedPassword = Buffer.from(user.password, 'base64').toString('utf8'); // decode from Base64
                const isValid = await compare(credentials.password, hashedPassword);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                // this will be stored in session
                return user;
            }
        })
    ],
    callbacks: {
        // Add id and role to the JWT token when user logs in
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.email = user.email;
                token.name = user.name;
                token.city = user.city; 
                token.state = user.state; 
                token.country = user.country;
                token.isApproved = user.isApproved;
            }
            return token;
        },

        // Add id and role from token to the session object
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string; 
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.city = token.city as string;
                session.user.state = token.state as string;
                session.user.country = token.country as string;
                session.user.isApproved = token.isApproved as boolean;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login", // redirect to your custom login page
    },
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 5 * 60, // 5mins
    },
    secret: process.env.AUTH_SECRET

};
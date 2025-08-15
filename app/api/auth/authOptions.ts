
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { DefaultSession, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
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
            name: 'Login Credentials',
            credentials: {
                email: { label: "Email ID", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    console.log("Authorizing user...");
                    const encodedEmailB64 = process.env.ENCODED_ADMIN_EMAIL_B64;
                    const encodedPasswordB64 = process.env.ENCODED_ADMIN_PASSWORD_B64;
                    const decodedEmailHash = encodedEmailB64 ? Buffer.from(encodedEmailB64, 'base64').toString('utf8') : '';
                    const decodedPasswordHash = encodedPasswordB64 ? Buffer.from(encodedPasswordB64, 'base64').toString('utf8') : '';
                    if (!decodedEmailHash || !decodedPasswordHash) {
                        throw new Error("Missing decoded ENCODED_ADMIN_EMAIL, ENCODED_ADMIN_PASSWORD");
                    }

                    const isMatchEmail = await compare(credentials!.email, decodedEmailHash);
                    const isMatchPass = await compare(credentials!.password, decodedPasswordHash);

                    return (isMatchEmail && isMatchPass) ? { id: "admin", name: "Admin" } : null;
                } catch (err) {
                    console.error("Authorize crashed:", err);
                    return null; // still causes 401 but logs why
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: {token: JWT, user?: User}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT;}) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 5 * 60, // 5mins
    },
    secret: process.env.AUTH_SECRET

};
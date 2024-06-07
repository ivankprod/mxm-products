import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

const config = {
	providers: [GitHub],
	basePath: "/auth",
	debug: process.env.NODE_ENV !== "production" ? true : false
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

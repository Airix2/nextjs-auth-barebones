import NextAuth from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: User;
	}
	interface User {
		id: string;
		firstname: string;
		lastname: string;
		email: string;
		password?: string;
		role: string;
		createdAt?: Date;
		updatedAt?: Date;
	}
}

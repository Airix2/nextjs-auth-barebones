import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { Users, UserInstance } from "@/models/User";
import { JWT } from "next-auth/jwt";

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
	return new Promise((resolve) => {
		compare(
			plainPassword,
			hashedPassword,
			function (err: Error | undefined, same: boolean) {
				resolve(same);
			}
		);
	});
};

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "jsmith@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.password || !credentials.email) return null;
				try {
					const user = await Users.findOne({
						where: {
							email: credentials?.email.toLowerCase(),
						},
						raw: true,
					});
					if (!user) {
						return null;
					}
					const passwordMatches = (await confirmPasswordHash(
						credentials?.password,
						user.password
					)) as Boolean;

					if (passwordMatches)
						return {
							id: user.id,
							firstname: user.firstname,
							lastname: user.lastname,
							email: user.email,
							role: user.role,
							createdAt: user.createdAt,
							updatedAt: user.updatedAt,
						};
				} catch (error) {
					console.log("Got an error querying for credentials", error);
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user = token.user as User;
			return session;
		},
	},
	jwt: {
		maxAge: 60,
	},
};

export default NextAuth(authOptions);

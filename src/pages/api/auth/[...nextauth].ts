import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
// import { Users } from "@/models/User";

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
					// const user = await Users.findOne({
					// 	where: {
					// 		email: credentials?.email.toLowerCase(),
					// 	},
					// 	raw: true,
					// });
					// if (!user) {
					// 	return null;
					// }
					// const passwordMatches = (await confirmPasswordHash(
					// 	credentials?.password,
					// 	user.password
					// )) as Boolean;
					const passwordMatches = true;
					const user = {
						id: "6b550ad4-9801-4d16-b4be-cfab51c30a91",
						firstname: "Alex",
						lastname: "Soto",
						email: "test@gmail.com",
						role: "user",
						createdAt: new Date("2022-09-01 10:00:51.792-07"),
						updatedAt: new Date("2022-09-01 10:00:51.792-07"),
					};

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
	secret: process.env.NEXTAUTH_SECRET,
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
		maxAge: 60 * 60 * 6,
	},
};

export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcrypt";

const docketwise_baseurl = "https://app.docketwise.com";

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
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		// {
		// 	id: "docketwise",
		// 	name: "Docketwise",
		// 	type: "oauth",
		// 	authorization: `${docketwise_baseurl}/oauth/authorize`,
		// 	token: `${docketwise_baseurl}/oauth/token`,
		// 	profile(profile) {
		// 		return {
		// 			id: profile.id,
		// 			name: profile.kakao_account?.profile.nickname,
		// 			email: profile.kakao_account?.email,
		// 			image: profile.kakao_account?.profile.profile_image_url,
		// 		};
		// 	},
		// },
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

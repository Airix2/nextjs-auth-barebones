import React, { ReactNode } from "react";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

interface LayoutProps {
	children: ReactNode;
	title?: string;
}

const MainLayout = ({ children, title }: LayoutProps) => {
	const { data: session } = useSession();
	return (
		<div className="p-5">
			<Head>
				<link rel="icon" href="/logo.png" />
				<title>
					{title
						? `${title} - Adriana's Insurance`
						: "Adriana's Insurance"}
				</title>
			</Head>
			<nav className="px-5 w-full flex justify-between">
				<Link href="/">Home</Link>
				<div className="flex gap-4">
					{session?.user ? (
						<>
							<Link href="profile">
								{session?.user.firstname} - Profile
							</Link>
							<Link href="admin">Admin</Link>
							<button
								onClick={() =>
									signOut({
										callbackUrl: "/",
									})
								}
							>
								Log out
							</button>
						</>
					) : (
						<button onClick={() => signIn()}>Log In</button>
					)}
				</div>
			</nav>
			<main className="py-5 flex justify-center">{children}</main>
		</div>
	);
};

export default MainLayout;

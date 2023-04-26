import React, { ReactNode } from "react";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import Head from "next/head";

interface LayoutProps {
	children: ReactNode;
	title?: string;
}

const SkeletonLayout = ({ children, title }: LayoutProps) => {
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
					<button onClick={() => signIn()}>Log In</button>
					<button onClick={() => signOut({ callbackUrl: "/" })}>
						Log out
					</button>
				</div>
			</nav>
			<main className="py-5 flex justify-center">{children}</main>
		</div>
	);
};

export default SkeletonLayout;

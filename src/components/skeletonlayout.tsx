import React, { ReactNode } from "react";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";

interface LayoutProps {
	children: ReactNode;
}

const SkeletonLayout = ({ children }: LayoutProps) => {
	return (
		<div className="p-5">
			<nav className="px-5 w-full flex justify-between">
				<Link href="/">Home</Link>
				<div className="flex gap-4">
					<button onClick={() => signIn()}>Log In</button>
					<button
						onClick={() =>
							signOut({ callbackUrl: "http://localhost:3000" })
						}
					>
						Log out
					</button>
				</div>
			</nav>
			<main className="py-5 flex justify-center">{children}</main>
		</div>
	);
};

export default SkeletonLayout;

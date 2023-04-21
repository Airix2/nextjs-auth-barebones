import React, { ReactNode } from "react";
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LayoutProps {
	children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
	const { data: session } = useSession();
	return (
		<div className="p-5">
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
										callbackUrl: "http://localhost:3000",
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

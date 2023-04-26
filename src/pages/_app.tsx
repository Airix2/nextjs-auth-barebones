import "@/styles/globals.css";
import React, { ReactNode } from "react";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { NextComponentType } from "next";
import { Inter } from "next/font/google";
import SkeletonLayout from "@/components/skeletonlayout";
import { useRouter } from "next/router";
import { checkRole } from "@/utils/permissions";

interface CustomComponentProps extends AppProps {
	Component: NextComponentType & {
		auth?: AuthRoles;
	};
}
interface AuthRoles {
	role: string;
}

const inter = Inter({ subsets: ["latin"] });

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: CustomComponentProps) {
	return (
		<main className={inter.className}>
			<SessionProvider session={session}>
				{Component?.auth ? (
					<Auth auth={Component.auth}>
						<Component {...pageProps} />
					</Auth>
				) : (
					<Component {...pageProps} />
				)}
			</SessionProvider>
		</main>
	);
}

function Auth({ children, auth }: { children: ReactNode; auth: AuthRoles }) {
	// if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
	const { status, data: session } = useSession({ required: true });
	const router = useRouter();

	if (status === "loading") {
		return <SkeletonLayout>{null}</SkeletonLayout>;
	}

	if (!checkRole(session.user.role, router.route)) {
		router.push("/");
		return <SkeletonLayout>{null}</SkeletonLayout>;
	}

	return <React.Fragment>{children}</React.Fragment>;
}

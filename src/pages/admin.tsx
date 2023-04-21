import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import MainLayout from "@/components/mainlayout";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
	const { data: session } = useSession();

	// useEffect(() => {
	// 	console.log(session);
	// }, [session]);

	return (
		<MainLayout>
			<div className="flex flex-col gap-10 bg-white">
				<h4 className="text-center">Admin Page</h4>
				<p className="text-center">
					this page IS protected and also need rights
				</p>
				<p>{session?.user.firstname}</p>
				<p>{session?.user.email}</p>
			</div>
		</MainLayout>
	);
}

Admin.auth = {
	role: "admin",
};

import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import MainLayout from "@/components/mainlayout";

export default function Profile() {
	const { data: session } = useSession();

	return (
		<MainLayout>
			<div className="flex flex-col gap-10">
				<h4 className="text-center">Profile</h4>
				<p className="text-center">this page IS protected</p>
				{session?.user && JSON.stringify(session.user)}
			</div>
		</MainLayout>
	);
}
Profile.auth = true;

import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import MainLayout from "@/components/mainlayout";

export default function Profile() {
	const { data: session } = useSession();
	const user = session?.user as any;

	return (
		<MainLayout>
			<div className="flex flex-col gap-10">
				<h4 className="text-center">Profile</h4>
				<p className="text-center">this page IS protected</p>
				{session?.user &&
					Object.keys(user).map((key) => (
						<p className="px-5">
							{key}: {user[key]}
						</p>
					))}
			</div>
		</MainLayout>
	);
}
Profile.auth = true;

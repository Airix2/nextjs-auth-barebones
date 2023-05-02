import { useSession } from "next-auth/react";
import MainLayout from "@/components/mainlayout";

const UserInfo = ({ user }: { user: any }) => {
	if (!user) return null;
	return (
		<>
			{Object.keys(user).map((key) => (
				<p className="px-5">
					{key}: {user[key]}
				</p>
			))}
		</>
	);
};

const MainContent = ({ user }: { user: any }) => {
	return (
		<div className="flex flex-col gap-10">
			<h4 className="text-center">Profile</h4>
			<p className="text-center">this page IS protected</p>
			<UserInfo user={user} />
		</div>
	);
};

export default function Profile() {
	const { data: session } = useSession();
	const user = session?.user as any;

	return (
		<MainLayout>
			<MainContent user={user} />
		</MainLayout>
	);
}
Profile.auth = true;

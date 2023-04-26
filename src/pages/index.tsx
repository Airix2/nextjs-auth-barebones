import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import MainLayout from "@/components/mainlayout";
import axios from "axios";

export default function Home({ environment }: any) {
	const { data } = useSession();

	const callNormalAPI = async () => {
		try {
			const ans = await axios.get("/api/normalroute");
			console.log(ans.data);
		} catch (error) {
			console.log(error);
		}
	};
	const callProtectedAPI = async () => {
		try {
			const ans = await axios.get("/api/protectedroute");
			console.log(ans.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MainLayout>
			<div className="flex flex-col gap-10">
				<p>Home page!</p>
				<p>this page is unprotected</p>
				<button onClick={callNormalAPI}>Normal API</button>
				<button onClick={callProtectedAPI}>Protected API</button>
			</div>
		</MainLayout>
	);
}

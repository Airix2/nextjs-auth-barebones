import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import MainLayout from "@/components/mainlayout";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: any) {
	const environment = {
		secret: process.env.NEXTAUTH_SECRET,
		url: process.env.NEXTAUTH_URL,
	};
	return {
		props: {
			environment,
		}, // will be passed to the page component as props
	};
}

export default function Home({ environment }: any) {
	const { data } = useSession();
	console.log(environment);

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

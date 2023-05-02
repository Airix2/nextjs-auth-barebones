import { useSession } from "next-auth/react";
import MainLayout from "@/components/mainlayout";
import axios from "axios";

export async function getServerSideProps(context: any) {
	return {
		props: {
			github: {
				client_id: process.env.GITHUB_ID,
				redirect_uri: "http://localhost:3000/api/auth/callback/github",
				state: "qwertyuiop",
				signup: "false",
			},
		},
	};
}

export default function Home({ github }: any) {
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
	const callGithubAPI = async () => {
		try {
			const ans = await axios.get("/api/github");
			console.log(ans.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MainLayout>
			<div className="flex flex-col gap-10">
				<p>Home page! this page is unprotected</p>
				<button onClick={callNormalAPI}>Normal API</button>
				<button onClick={callProtectedAPI}>Protected API</button>
				<a
					href={`https://github.com/login/oauth/authorize?client_id=${github.client_id}&redirect_uri=${github.redirect_uri}&state=${github.state}&signup=${github.signup}`}
				>
					Login API Github
				</a>
				<button onClick={callGithubAPI}>Github API</button>
			</div>
		</MainLayout>
	);
}

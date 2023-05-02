import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
const redirect_uri = "http://localhost:3000/api/auth/callback/github";
const redirect_uri2 = "http://localhost:3000/profile";
const state = "qwertyuiop";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// console.log(req.query);
	if (req.query.state !== state) {
		return res.status(500).send({
			error: true,
			data: "State does not match. An attacker may have intercepted the authorization process",
		});
	}

	try {
		const token_res = await axios.post(
			`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${req.query.code}&redirect_uri=${redirect_uri}`,
			{},
			{
				headers: {
					Accept: "application/json",
				},
			}
		);
		// console.log(token_res.data);

		if (token_res.data) {
			console.log(token_res.data);
			const cookies = new Cookies(req, res);
			cookies.set("API_DW", token_res.data.access_token, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				sameSite: false ? "strict" : "lax",
				// sameSite: config.production ? "strict" : "lax",
				overwrite: true,
			});

			// const test = await axios.get("https://api.github.com/user", {
			// 	headers: {
			// 		Authorization: `Bearer ${token_res.data.access_token}`,
			// 	},
			// });
			return res.send({ error: false, msg: "Tested completely!" });
		} else {
			return res.send({ error: false, msg: "Failed to get token!" });
		}
	} catch (error: any) {
		console.log(error.data);
		return res.status(500).send({
			error: true,
			data: "Error for axios",
		});
	}
}

import axios from "axios";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const cookies = new Cookies(req, res);
		const access_token = cookies.get("API_DW");
		// console.log(access_token);

		const test = await axios.get("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return res.status(200).send({
			error: false,
			msg: "Got the data",
			data: test.data,
		});
	} catch (error: any) {
		return res.status(error.response.status).send({
			error: true,
			msg: error.response?.data?.message,
		});
	}
}

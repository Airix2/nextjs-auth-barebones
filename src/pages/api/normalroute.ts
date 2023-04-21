import { Users } from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let user = await Users.findOne({
		where: {
			firstname: "Alex",
		},
	});
	res.status(200).json(user);
}

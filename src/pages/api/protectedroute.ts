import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { checkRole } from "@/utils/permissions";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);
	console.log(session);

	if (!session) {
		return res.status(401).send({
			error: "You must be signed in to view the protected content on this page.",
		});
	}
	if (!checkRole(session.user.role, req.url!)) {
		return res.status(403).send({
			error: "You don't have the permission to view this route.",
		});
	}
	return res.status(200).send({
		content:
			"This is protected content. You can access this content because you are signed in.",
	});
}

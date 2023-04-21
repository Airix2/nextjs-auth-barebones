const checkUrls = {
	"/admin": ["admin"],
	"/profile": ["admin", "user"],
	"/api/protectedroute": ["admin"],
} as any;

export const checkRole = (role: string, url: string): boolean => {
	console.log(role, url, checkUrls[url]);
	if (checkUrls[url]) {
		return checkUrls[url].includes(role);
	}
	return true;
};
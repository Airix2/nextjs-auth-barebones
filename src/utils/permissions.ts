const checkUrls = {
	"/admin": ["admin"],
	"/profile": ["admin", "user", undefined],
	"/api/protectedroute": ["admin"],
} as any;

export const checkRole = (role: string, url: string): boolean => {
	if (checkUrls[url]) {
		return checkUrls[url].includes(role);
	}
	return true;
};

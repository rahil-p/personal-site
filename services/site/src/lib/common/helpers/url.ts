// eslint-disable-next-line security/detect-non-literal-regexp
export const hostRegex = new RegExp(window.location.host);

export const isHrefExternal = (href?: string) => {
	if (!href) return false;
	if (href.startsWith('#')) return false;
	if (href.startsWith('/')) {
		if (href.startsWith('//') || href.startsWith('http')) {
			if (hostRegex.test(href)) return false;
			return true;
		}

		return false;
	}

	return true;
};

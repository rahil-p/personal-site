exports.pkg = require('../package.json');
exports.webManifest = require('../src/manifest.json');

exports.templateParameters = {
	app: {
		...exports.webManifest,
		startup: [
			{ w: 320, h: 568, dpr: 2 },
			{ w: 375, h: 812, dpr: 3 },
			{ w: 375, h: 667, dpr: 2 },
			{ w: 390, h: 844, dpr: 3 },
			{ w: 414, h: 736, dpr: 3 },
			{ w: 414, h: 896, dpr: 2 },
			{ w: 414, h: 896, dpr: 3 },
			{ w: 428, h: 926, dpr: 3 },
			{ w: 744, h: 1133, dpr: 2 },
			{ w: 768, h: 1024, dpr: 2 },
			{ w: 810, h: 1080, dpr: 2 },
			{ w: 820, h: 1180, dpr: 2 },
			{ w: 834, h: 1194, dpr: 2 },
			{ w: 834, h: 1112, dpr: 2 },
			{ w: 1024, h: 1366, dpr: 2 },
		],
		touchIcons: [180, 1024],
	},
	CSP_SCRIPT_NONCE: '**CSP_SCRIPT_NONCE**',
	CSP_STYLE_NONCE: '**CSP_STYLE_NONCE**',
	SITE_URL: '**SITE_URL**',
	GOOGLE_TAGMANAGER_ID: '**GOOGLE_TAGMANAGER_ID**',
	SENTRY_PROJECT: '**SENTRY_PROJECT**',
	SENTRY_DSN: '**SENTRY_DSN**',
	SENTRY_ENVIRONMENT: '**SENTRY_ENVIRONMENT**',
	CONTACT_EMAIL: '**CONTACT_EMAIL**',
	SOCIAL_GITHUB_URL: '**SOCIAL_GITHUB_URL**',
	SOCIAL_STACKOVERFLOW_URL: '**SOCIAL_STACKOVERFLOW_URL**',
	SOCIAL_TWITTER_ID: '**SOCIAL_TWITTER_ID**',
	SOCIAL_TWITTER_URL: '**SOCIAL_TWITTER_URL**',
};

exports.httpErrors = {
	400: 'Bad Request',
	401: 'Unauthorized',
	402: 'Payment Required',
	403: 'Forbidden',
	404: 'Page Not Found',
	405: 'Method Not Allowed',
	406: 'Not Acceptable',
	407: 'Proxy Authentication Required',
	408: 'Request Timeout',
	409: 'Conflict',
	410: 'Gone',
	411: 'Length Required',
	412: 'Precondition Failed',
	413: 'Payload Too Large',
	414: 'URI Too Long',
	415: 'Unsupported Media Type',
	416: 'Range Not Satisfiable',
	417: 'Expectation Failed',
	418: "I'm a teapot",
	421: 'Misdirected Request',
	422: 'Unprocessable Entity',
	423: 'Locked',
	424: 'Failed Dependency',
	425: 'Too Early',
	426: 'Upgrade Required',
	428: 'Precondition Required',
	429: 'Too Many Requests',
	431: 'Request Header Fields Too Large',
	451: 'Unavailable For Legal Reasons',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
	505: 'HTTP Version Not Supported',
	506: 'Variant Also Negotiates',
	507: 'Insufficient Storage',
	508: 'Loop Detected',
	510: 'Not Extended',
	511: 'Network Authentication Required',
};

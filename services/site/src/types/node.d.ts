declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			SITE_PACKAGE_VERSION: string;
		}
	}
}

export {};

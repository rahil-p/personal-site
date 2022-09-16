import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			main: {
				background: string;
				backgroundAlt: string;
				color: string;
				colorDim: string;
				colorSoft: string;
				colorSofter: string;
			};
			accent: {
				main0: string;
				alt0: string;
				blobR: string;
				blobG: string;
				blobB: string;
			};
		};
	}
}

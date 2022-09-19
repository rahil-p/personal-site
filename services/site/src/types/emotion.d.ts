import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			main: {
				background: string;
				backgroundAlt: string;
				backgroundAltSoft: string;
				color: string;
				colorDim: string;
				colorDimTint: string;
				colorSoft: string;
				colorSofter: string;
			};
			accent: {
				interactive0: string;
				interactive1: string;
				highlight0: string;
				highlight1: string;
				error: string;
				blobR: string;
				blobG: string;
				blobB: string;
			};
		};
	}
}

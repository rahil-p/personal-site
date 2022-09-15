import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			main: {
				background: string;
				backgroundAlt: string;
				color: string;
				colorDim: string;
			};
			accent: {
				main0: string;
				alt0: string;
				blobR: string;
				blobG: string;
				blobB: string;
			};
			greyscale: {
				i0: string;
				i1: string;
				i2: string;
				i3: string;
				i4: string;
				i5: string;
				i6: string;
				i7: string;
				i8: string;
			};
		};
	}
}

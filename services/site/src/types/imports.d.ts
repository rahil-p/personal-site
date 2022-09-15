declare module '*.svg' {
	import type { FunctionComponent, SVGProps } from 'react';
	const SVG: FunctionComponent<SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.mp4' {
	const src: string;
	export default src;
}

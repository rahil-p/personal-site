import { css } from '@emotion/react';

import BlobsGraphic from '../../../../../public/images/ui/blobs-a.svg';

export default function IntroHeading() {
	return (
		<div
			css={css`
				position: relative;
				margin-bottom: 1.25em;
				font-size: clamp(2.25rem, 7.5vw, 5.75rem);
				line-height: 1;
			`}
		>
			<hgroup
				css={css`
					font-weight: 700;
				`}
			>
				<span
					css={css`
						display: block;
						margin-bottom: 0.3em;
						font-size: 0.65em;
					`}
				>
					Hello. I&apos;m
				</span>
				<h1
					css={css`
						position: relative;
						left: -0.05em;
						font-size: 1em;
					`}
				>
					Rahil Patel
				</h1>
			</hgroup>
			<BlobsGraphic
				css={css`
					position: absolute;
					top: 0.425em;
					left: 1.565em;
					height: 0.14em;
				`}
			/>
		</div>
	);
}

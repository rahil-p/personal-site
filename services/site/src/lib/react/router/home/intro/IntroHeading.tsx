import { css } from '@emotion/react';

export default function IntroHeading() {
	return (
		<hgroup
			css={css`
				margin-bottom: 1.25em;
				font-size: clamp(2.25rem, 7.5vw, 5.75rem);
				font-weight: 700;
				line-height: 1;
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
	);
}

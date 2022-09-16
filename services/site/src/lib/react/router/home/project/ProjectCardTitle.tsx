import { css } from '@emotion/react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
	children: ReactNode;
}

export default function ProjectCardTitle(props: Props) {
	const { children, ...delegatedProps } = props;

	return (
		<div
			css={css`
				margin: 1em 0 0.75em;
				font-size: clamp(0.9rem, 5vw, 1.15rem);
				line-height: 1.25;
			`}
			{...delegatedProps}
		>
			{children}
		</div>
	);
}

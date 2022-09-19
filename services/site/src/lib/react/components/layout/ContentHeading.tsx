import { css, useTheme } from '@emotion/react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props extends ComponentPropsWithoutRef<'h2'> {
	children: ReactNode;
	cssExtra?: CSSExtra;
}

export default function ContentHeading(props: Props) {
	const { children, cssExtra, ...delegatedProps } = props;

	const theme = useTheme();

	return (
		<h2
			css={[
				css`
					margin-bottom: 1em;
					font-size: clamp(1.5rem, 4vw, 1.8rem);
					color: ${theme.colors.main.color};
					cursor: default;
					transition: color calc(var(--ease-time) * 1.5) ease-in-out;

					&:hover {
						color: ${theme.colors.accent.interactive1};
					}
				`,
				cssExtra,
			]}
			{...delegatedProps}
		>
			{children}
		</h2>
	);
}

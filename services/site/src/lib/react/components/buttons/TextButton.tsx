import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

export const textButtonStyle = (theme: Theme) => css`
	color: inherit;
	text-decoration: solid underline currentColor 1px;
	transition: color var(--ease-time) var(--ease-fn);

	&:is(:link, :visited, :active, :hover) {
		color: inherit;
	}

	&:hover {
		color: ${theme.colors.accent.interactive0};
	}
`;

export interface Props extends ComponentPropsWithoutRef<'button'> {
	children: ReactNode;
	cssExtra?: CSSExtra;
}

export default function TextButton(props: Props) {
	const { children, cssExtra, ...delegatedAttributes } = props;

	return (
		<button css={[textButtonStyle, cssExtra]} type={'button'} {...delegatedAttributes}>
			{children}
		</button>
	);
}

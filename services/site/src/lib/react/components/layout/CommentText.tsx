import { css, useTheme } from '@emotion/react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props extends ComponentPropsWithoutRef<'span'> {
	children?: ReactNode;
	cssExtra?: CSSExtra;
}

export default function CommentText(props: Props) {
	const { cssExtra, children, ...delegatedProps } = props;

	const theme = useTheme();

	return (
		<span
			css={[
				css`
					& > span:first-of-type {
						font-weight: 400;
						color: ${theme.colors.main.color};
						user-select: none;

						&:not(:only-child)::after {
							content: '\\2000';
						}
					}

					& > span:last-of-type:not(:only-child) {
						font-family: _dm, monospace;
						font-weight: 300;
						color: ${theme.colors.main.colorSoft};
					}
				`,
				cssExtra,
			]}
			{...delegatedProps}
		>
			<span>{'//'}</span>
			{children ? <span>{children}</span> : null}
		</span>
	);
}

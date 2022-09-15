import { css, useTheme } from '@emotion/react';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props extends ComponentPropsWithoutRef<'span'> {
	children: ReactNode;
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
						color: ${theme.colors.greyscale.i8};
						user-select: none;

						&::after {
							content: '\\2000';
						}
					}

					& > span:last-of-type {
						font-family: _dm, monospace;
						font-weight: 300;
						color: ${theme.colors.greyscale.i6};
					}
				`,
				cssExtra,
			]}
			{...delegatedProps}
		>
			<span>{'//'}</span>
			<span>{children}</span>
		</span>
	);
}

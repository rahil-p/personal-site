import { css, useTheme } from '@emotion/react';

import type { CSSExtra } from '../../../common/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithoutRef<'ul'> {
	items: [key: string, value: ReactNode][];
	cssExtra?: CSSExtra;
}

export default function InlineList(props: Props) {
	const { items, cssExtra, ...delegatedProps } = props;

	const theme = useTheme();

	return (
		<ul
			css={[
				css`
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					column-gap: 1.5em;
					padding: 0;
					margin: 0;
					font-family: _dm, monospace;
					font-size: clamp(0.8rem, 2.325vw, 0.875rem);
					color: ${theme.colors.main.colorSoft};
				`,
				cssExtra,
			]}
			role={'list'}
			{...delegatedProps}
		>
			{items.map(([key, value]) => {
				if (!value) return null;

				return (
					<li
						key={key}
						css={css`
							font-size: 0.85em;
						`}
					>
						{value}
					</li>
				);
			})}
		</ul>
	);
}

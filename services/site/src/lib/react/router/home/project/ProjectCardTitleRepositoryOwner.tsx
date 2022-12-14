import { css, useTheme } from '@emotion/react';

import TextAnchor from '../../../components/buttons/TextAnchor';

import type { ComponentPropsWithoutRef } from 'react';

interface Props {
	name: string;
	anchorProps: ComponentPropsWithoutRef<'a'>;
}

export default function ProjectCardTitleRepositoryOwner(props: Props) {
	const { name, anchorProps } = props;

	const theme = useTheme();

	return (
		<span
			css={css`
				display: block;
				font-size: 0.8em;
				font-weight: 700;
				color: ${theme.colors.main.colorSoft};
			`}
		>
			<TextAnchor
				css={css`
					text-decoration: none;
				`}
				{...anchorProps}
			>
				{name}
			</TextAnchor>
			/
		</span>
	);
}

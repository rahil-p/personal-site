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
				font-weight: 700;
				color: ${theme.colors.greyscale.i6};
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

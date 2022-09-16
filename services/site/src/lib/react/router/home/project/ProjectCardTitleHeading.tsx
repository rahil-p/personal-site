import { css } from '@emotion/react';

import TextAnchor from '../../../components/buttons/TextAnchor';

import type { ComponentPropsWithoutRef } from 'react';

interface Props {
	name: string;
	anchorProps?: ComponentPropsWithoutRef<'a'>;
}

export default function ProjectCardTitleHeading(props: Props) {
	const { name, anchorProps } = props;

	return (
		<h3
			css={css`
				font-size: 1.4em;
			`}
		>
			{anchorProps ? (
				<TextAnchor
					css={css`
						text-decoration: none;
					`}
					{...anchorProps}
				>
					{name}
				</TextAnchor>
			) : (
				name
			)}
		</h3>
	);
}

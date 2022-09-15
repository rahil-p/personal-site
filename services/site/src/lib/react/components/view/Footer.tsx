import { css, useTheme } from '@emotion/react';

import SocialNav from '../layout/SocialNav';
import CommentText from '../layout/CommentText';
import TextAnchor from '../buttons/TextAnchor';
import { useMetaTemplate } from '../../hooks/dom';

export default function Footer() {
	const theme = useTheme();

	const meta = useMetaTemplate();
	const emailAddress = meta.current['rp:contact:email'] ?? '';

	return (
		<footer
			css={css`
				z-index: 99;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				row-gap: 1em;
				column-gap: 4em;
				align-content: center;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				padding: calc(var(--padding-h-main) / 2) var(--padding-h-main);
				color: ${theme.colors.main.color};
				background-color: ${theme.colors.main.background};
				text-rendering: optimizeLegibility;
			`}
		>
			<div
				css={css`
					font-size: 0.85em;
					white-space: nowrap;

					& > span {
						display: block;
					}
				`}
			>
				<CommentText>built by Rahil Patel</CommentText>
				<CommentText>
					<TextAnchor href={`mailto:${emailAddress}`} title={'Email me'}>
						{emailAddress}
					</TextAnchor>
				</CommentText>
			</div>
			<SocialNav
				css={css`
					font-size: 1.125em;
				`}
			/>
		</footer>
	);
}

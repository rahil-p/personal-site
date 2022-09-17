import { css, useTheme } from '@emotion/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import SocialNav from '../layout/SocialNav';
import CommentText from '../layout/CommentText';
import TextAnchor from '../buttons/TextAnchor';
import { useMetaTemplate } from '../../hooks/dom';
import ImageLoader from '../layout/ImageLoader';
import headshotImage from '../../../../public/images/assets/headshot-square-medium-bw-128.png';

import type { CSSExtra } from '../../../common/types';

interface Props {
	cssExtra?: CSSExtra;
}

export default function Footer(props: Props) {
	const { cssExtra } = props;

	const theme = useTheme();

	const meta = useMetaTemplate();
	const emailAddress = meta.current['rp:contact:email'] ?? '';

	return (
		<footer
			css={[
				css`
					z-index: 99;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					row-gap: 1.75em;
					column-gap: 4em;
					align-content: center;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					padding: calc(var(--padding-h-main) / 2) var(--padding-h-main);
					margin-top: auto;
					color: ${theme.colors.main.color};
					background-color: ${theme.colors.main.background};
					text-rendering: optimizeLegibility;

					@media (max-width: 375px) {
						flex-direction: column;
						justify-content: center;
					}
				`,
				cssExtra,
			]}
		>
			<div
				css={css`
					display: flex;
					gap: 1em;
					align-items: center;
				`}
			>
				<ImageLoader
					render={setImageLoaded => (
						<LazyLoadImage
							afterLoad={() => {
								setImageLoaded(true);
							}}
							alt={'Rahil Patel'}
							css={css`
								width: 100%;
								height: 100%;
							`}
							src={headshotImage}
							threshold={400}
						/>
					)}
				/>
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
						<TextAnchor
							cssExtra={css`
								text-underline-offset: 0.25em;
							`}
							href={`mailto:${emailAddress}`}
							title={'Email me'}
						>
							{emailAddress}
						</TextAnchor>
					</CommentText>
				</div>
			</div>
			<SocialNav
				css={css`
					font-size: 1.125em;
				`}
			/>
		</footer>
	);
}

import { css, useTheme } from '@emotion/react';

import CommentText from '../../../components/layout/CommentText';
import SocialNav, { Platform, socialAnchorStyle } from '../../../components/layout/SocialNav';
import { useMetaTemplate } from '../../../hooks/dom';
import EmailGraphic from '../../../../../public/images/ui/email.svg';
import IntroHeading from './IntroHeading';

export default function IntroContent() {
	const theme = useTheme();

	const meta = useMetaTemplate();
	const emailAddress = meta.current['rp:contact:email'] ?? '';

	return (
		<div
			css={css`
				display: flex;
				column-gap: clamp(2em, 10vw, 12em);
				justify-content: space-between;
				padding: var(--padding-h-main);
				padding-top: clamp(2.25rem, calc(var(--padding-h-main) * 1.5), 8em);

				@media (max-width: 400px) {
					flex-direction: column;
					row-gap: 4em;
				}
			`}
		>
			<div>
				<IntroHeading />
				<div
					css={css`
						font-size: 1em;
						color: ${theme.colors.main.colorSoft};
					`}
				>
					<div
						css={css`
							display: flex;
							flex-wrap: wrap;
							row-gap: 0.5em;
							column-gap: 4em;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 1em;
							font-weight: 700;
						`}
					>
						<span>Software engineer</span>
						<aside
							css={css`
								display: inline-flex;
								column-gap: 1em;
								font-size: 0.85em;
							`}
						>
							<CommentText data-nosnippet />
						</aside>
					</div>
					<p>
						I enjoy using creativity, collaboration, and code to build simple solutions for complex
						problems.
					</p>
				</div>
			</div>
			<SocialNav
				cssExtra={css`
					flex-direction: column;
					align-items: center;
					justify-content: flex-end;
					font-size: 1.25em;

					@media (max-width: 1000px) {
						justify-content: flex-start;
					}

					@media (max-width: 400px) {
						flex-direction: row;
					}
				`}
				exclude={[Platform.STACK_OVERFLOW]}
			>
				<a
					css={[
						socialAnchorStyle(theme),
						css`
							width: 0.925em;
							height: 0.925em;
						`,
					]}
					href={`mailto:${emailAddress}`}
					rel={'noopener noreferrer'}
					role={'link'}
					target={'_blank'}
					title={'Email me'}
				>
					<EmailGraphic />
				</a>
			</SocialNav>
		</div>
	);
}

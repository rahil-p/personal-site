import { css, useTheme } from '@emotion/react';

import { socialAnchorStyle } from '../../../components/layout/SocialNav';
import SocialGithubGraphic from '../../../../../public/images/ui/social/github.svg';
import LinkGraphic from '../../../../../public/images/ui/link.svg';

import type { ComponentPropsWithoutRef } from 'react';
import type { Theme } from '@emotion/react';

interface Props {
	repositoryAnchorProps?: ComponentPropsWithoutRef<'a'>;
	siteAnchorProps?: ComponentPropsWithoutRef<'a'>;
	unreleased?: boolean;
}

const anchorStyle = (theme: Theme) => css`
	${socialAnchorStyle(theme)};

	&:is(:link, :visited, :active):not(:hover) {
		color: ${theme.colors.greyscale.i6};
	}
`;

const anchorProps = {
	rel: 'noopener noreferrer',
	role: 'link',
	target: '_blank',
};

export default function ProjectCardNav(props: Props) {
	const { repositoryAnchorProps, siteAnchorProps, unreleased } = props;

	const theme = useTheme();

	return (
		<nav
			className={'project-card--title-nav'}
			css={css`
				display: inline-flex;
				flex-direction: row;
				column-gap: 0.75em;
				align-items: center;
				margin-top: 0.5em;
				font-size: 0.85em;
			`}
		>
			{repositoryAnchorProps ? (
				<a css={anchorStyle} title={'Visit repository'} {...anchorProps} {...repositoryAnchorProps}>
					<SocialGithubGraphic />
				</a>
			) : null}
			{siteAnchorProps ? (
				<a
					css={[
						anchorStyle,
						css`
							font-size: 0.9em;
						`,
					]}
					title={'Visit website'}
					{...anchorProps}
					{...siteAnchorProps}
				>
					<LinkGraphic />
				</a>
			) : null}
			{unreleased ? (
				<span
					css={css`
						font-size: 0.9em;
						font-style: italic;
						color: ${theme.colors.greyscale.i5};
					`}
				>
					Coming soon
				</span>
			) : null}
		</nav>
	);
}

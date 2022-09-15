import { css, useTheme } from '@emotion/react';

import { useMetaTemplate } from '../../hooks/dom';
import SocialGithubGraphic from '../../../../public/images/ui/social/github.svg';
import SocialTwitterGraphic from '../../../../public/images/ui/social/twitter.svg';
import SocialStackOverflowGraphic from '../../../../public/images/ui/social/stackoverflow.svg';

import type { Theme } from '@emotion/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props extends ComponentPropsWithoutRef<'nav'> {
	cssExtra?: CSSExtra;
	children?: ReactNode;
	exclude?: Platform[];
}

export const socialAnchorStyle = (theme: Theme) => css`
	width: 1em;
	height: 1em;
	transition: color var(--ease-time) var(--ease-fn), fill var(--ease-time) var(--ease-fn);

	&:is(:link, :visited, :active) {
		color: inherit;
	}

	&:hover {
		color: ${theme.colors.accent.alt0};
	}
`;

export enum Platform {
	GITHUB,
	TWITTER,
	STACK_OVERFLOW,
}

export default function SocialNav(props: Props) {
	const { children, cssExtra, exclude, ...delegatedProps } = props;

	const theme = useTheme();

	const meta = useMetaTemplate();

	const socialAnchorProps = (key: string, style?: CSSExtra) => {
		return {
			target: '_blank',
			rel: 'noopener noreferrer',
			role: 'link',
			href: meta.current[`rp:social:${key}:url`] as string,
			css: [socialAnchorStyle(theme), style],
		};
	};

	return (
		<nav
			css={[
				css`
					display: flex;
					gap: 1em;
				`,
				cssExtra,
			]}
			{...delegatedProps}
		>
			{!exclude?.includes(Platform.GITHUB) ? (
				<a {...socialAnchorProps('github')} title={'Visit me on GitHub'}>
					<SocialGithubGraphic />
				</a>
			) : null}
			{!exclude?.includes(Platform.TWITTER) ? (
				<a {...socialAnchorProps('twitter')} title={'Follow me on Twitter'}>
					<SocialTwitterGraphic />
				</a>
			) : null}
			{!exclude?.includes(Platform.STACK_OVERFLOW) ? (
				<a
					{...socialAnchorProps(
						'stackoverflow',
						css`
							width: 0.925em;
							height: 0.925em;
						`,
					)}
					title={'Visit me on Stack Overflow'}
				>
					<SocialStackOverflowGraphic />
				</a>
			) : null}
			{children}
		</nav>
	);
}

import { useState } from 'react';

import { css, useTheme } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';

import TextAnchor from '../../../components/buttons/TextAnchor';
import InlineList from '../../../components/layout/InlineList';
import { fadeTransitionStyle } from '../../../../common/styles/transitions';

import type { ComponentPropsWithoutRef } from 'react';

interface Author {
	name: string;
	affiliation: string;
}

interface Props {
	article: {
		title: string;
		authors: Author[];
		anchorProps: ComponentPropsWithoutRef<'a'>;
	};
	journal: {
		name: string;
		anchorProps: ComponentPropsWithoutRef<'a'>;
	};
}

export default function ResearchBlurb(props: Props) {
	const { article, journal } = props;

	const theme = useTheme();

	const [affiliation, setAffiliation] = useState<string | null>(null);

	return (
		<div>
			<p
				css={css`
					margin-bottom: 0.75em;
					color: ${theme.colors.main.colorSoft};
				`}
			>
				<TextAnchor
					cssExtra={css`
						text-decoration: none;
					`}
					{...article.anchorProps}
				>
					{article.title}
				</TextAnchor>
				<span
					css={css`
						color: ${theme.colors.main.color};

						&::before,
						&::after {
							content: '\\2000';
						}
					`}
				>
					|
				</span>
				<span
					css={css`
						font-weight: 300;
					`}
				>
					<TextAnchor
						cssExtra={css`
							text-decoration: none;
						`}
						{...journal.anchorProps}
					>
						{journal.name}
					</TextAnchor>
				</span>
			</p>
			<InlineList
				cssExtra={css`
					& > li:nth-of-type(3) {
						color: ${theme.colors.main.color};
					}
				`}
				items={article.authors.map(author => {
					return [
						author.name,
						<span
							key={author.name}
							css={css`
								cursor: default;
								transition: color var(--ease-time) var(--ease-fn);

								&:hover {
									color: ${theme.colors.accent.highlight0};
								}
							`}
							onMouseEnter={() => setAffiliation(author.affiliation)}
							onMouseLeave={() => setAffiliation(null)}
						>
							{author.name}
						</span>,
					];
				})}
			/>
			<div
				css={css`
					height: 3em;
					margin-top: 1em;
					overflow: hidden;
					font-size: 0.85em;
					color: ${theme.colors.accent.highlight1};
				`}
			>
				<CSSTransition
					addEndListener={(node, done) => {
						node.addEventListener('transitionend', done, false);
					}}
					classNames={'fade'}
					css={fadeTransitionStyle}
					in={affiliation !== null}
				>
					<p
						css={css`
							text-overflow: ellipsis;
						`}
					>
						{affiliation}
					</p>
				</CSSTransition>
			</div>
		</div>
	);
}

import { css, useTheme } from '@emotion/react';

import { ProjectsGroup, useProjects } from '../../../hooks/projects';
import ContentHeading from '../../../components/layout/ContentHeading';

import type ProjectCardForProduct from './ProjectCardForProduct';
import type ProjectCardForRepository from './ProjectCardForRepository';
import type { ReactElement } from 'react';

type ProjectsSectionChild = ReactElement<typeof ProjectCardForProduct | typeof ProjectCardForRepository>;

export interface Props {
	group: ProjectsGroup;
	children: ProjectsSectionChild | ProjectsSectionChild[];
}

const groupHeadings: Record<ProjectsGroup, string> = {
	[ProjectsGroup.PRODUCT]: 'Product',
	[ProjectsGroup.FEATURED]: 'Featured',
	[ProjectsGroup.CONTRIBUTIONS]: 'Contributions',
};

export default function ProjectsSection(props: Props) {
	const { group, children } = props;

	const theme = useTheme();
	const { isGroupFocused, isGroupDimmed, dispatchFocusedState } = useProjects();

	return (
		<section
			css={css`
				--projects-section-ease-time: calc(var(--ease-time) * 1.5);
				--projects-section-ease-fn: ease-in-out;
			`}
		>
			<ContentHeading
				className={(() => {
					const classes = ['projects-section__title'];
					if (isGroupDimmed(group)) {
						classes.push('projects-section__title--dim');
					} else if (isGroupFocused(group)) {
						classes.push('projects-section__title--focus');
					}
					return classes.join(' ');
				})()}
				cssExtra={css`
					width: fit-content;
					padding-bottom: 0.625em;
					margin-right: var(--padding-h-main);
					margin-bottom: 0;
					margin-left: auto;
					text-align: right;
					transition: color var(--projects-section-ease-time) var(--projects-section-ease-fn);

					&.projects-section__title--dim {
						color: ${theme.colors.main.colorDimTint};
					}

					&.projects-section__title--focus {
						color: ${theme.colors.accent.interactive1};
					}
				`}
				onMouseEnter={() => {
					dispatchFocusedState({ type: 'group', value: group });
				}}
				onMouseLeave={() => {
					dispatchFocusedState(null);
				}}
			>
				{groupHeadings[group]}
			</ContentHeading>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					row-gap: 0;
				`}
			>
				{children}
			</div>
		</section>
	);
}

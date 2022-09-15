import { css, useTheme } from '@emotion/react';

import { useProjects } from '../../../hooks/projects';

import type { ProjectsGroup } from '../../../hooks/projects';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface Props extends ComponentPropsWithoutRef<'div'> {
	group: ProjectsGroup;
	name: string;
	children: ReactNode;
	preview?: ReactNode;
}

export default function ProjectCard(props: Props) {
	const { group, name, preview, children, ...delegatedProps } = props;

	const theme = useTheme();
	const { isProjectDimmed, isProjectFocused, dispatchFocusedState } = useProjects();

	return (
		<div
			css={css`
				--project-card-focus-scale: 1.025;

				padding: 1em 0 1em calc(100% - (100% / var(--project-card-focus-scale)));
			`}
			{...delegatedProps}
			onMouseEnter={e => {
				dispatchFocusedState({ type: 'card', value: { group, card: name } });
				delegatedProps.onMouseEnter?.(e);
			}}
			onMouseLeave={e => {
				dispatchFocusedState(null);
				delegatedProps.onMouseLeave?.(e);
			}}
		>
			<div
				className={(() => {
					const classes = ['project-card__container'];
					if (isProjectDimmed(group, name)) {
						classes.push('project-card__container--dim');
					} else if (isProjectFocused(group, name)) {
						classes.push('project-card__container--focus');
					}
					return classes.join(' ');
				})()}
				css={css`
					position: relative;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					min-width: 40vw;
					overflow: hidden;
					backdrop-filter: blur(4px);
					background-color: ${theme.colors.main.backgroundAlt}dd;
					border-radius: var(--border-radius-0) 0 0 var(--border-radius-0);
					transition: transform var(--projects-section-ease-time) var(--projects-section-ease-fn),
						backdrop-filter var(--projects-section-ease-time) var(--projects-section-ease-fn);
					transform-origin: 100% 50%;

					&::after {
						content: '';
						opacity: 0;
						transition: opacity var(--projects-section-ease-time) var(--projects-section-ease-fn);
					}

					&.project-card__container--dim {
						&::after {
							position: absolute;
							z-index: 1;
							width: 100%;
							height: 100%;
							content: '';
							background-color: ${theme.colors.main.backgroundAlt}33;
							opacity: 1;
						}
						transform: scale(calc(2 - var(--project-card-focus-scale)));
						backdrop-filter: blur(2px);
					}

					&.project-card__container--focus {
						transform: scale(var(--project-card-focus-scale));
						backdrop-filter: blur(6px);
					}

					@media (prefers-reduced-motion: reduce) {
						--project-card-focus-scale: 1.006125;
					}

					@media (prefers-reduced-transparency: reduce) {
						background-color: ${theme.colors.main.backgroundAlt}f2;
					}
				`}
			>
				<div
					className={(() => {
						const classes = ['project-card__summary'];
						if (preview) classes.push('project-card__summary--full');
						return classes.join(' ');
					})()}
					css={css`
						display: flex;
						flex-direction: column;
						padding: max(calc(var(--padding-h-main) / 2), 2rem);

						&.project-card__summary--full {
							padding-right: var(--padding-h-main);
						}
					`}
				>
					{children}
				</div>
				{preview}
			</div>
		</div>
	);
}

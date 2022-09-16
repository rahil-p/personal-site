import { css } from '@emotion/react';

import ProjectCardForProduct from './ProjectCardForProduct';
import ProjectCardForRepository from './ProjectCardForRepository';
import ProjectsSection from './ProjectsSection';
import {
	FrameworkAPIs,
	FrameworkCloudPlatforms,
	FrameworkDatabases,
	FrameworkLanguages,
	FrameworkTechnologies,
} from './ProjectCardFrameworks';
import { ProjectsContext, ProjectsGroup, useProjectsDispatch } from '../../../hooks/projects';
import BlobsCanvasAnimation from '../../../components/graphics/BlobsCanvasAnimation';

export default function ProjectsBanner() {
	const projectsDispatch = useProjectsDispatch();

	return (
		<div
			css={css`
				--padding-top: max(calc(var(--padding-h-main) * 2), 5rem);

				position: relative;
				display: flex;
				padding: var(--padding-top) 0 calc(var(--padding-top) * 1.5);
			`}
		>
			<div
				css={css`
					position: absolute;
					top: var(--padding-top);
					left: -37.5%;
					height: calc(100% - var(--padding-top));
					clip-path: inset(0);

					@media (max-width: 1000px) {
						left: -25%;
					}
				`}
			>
				<BlobsCanvasAnimation
					cssExtra={css`
						position: sticky;
						top: 2%;
						width: max(10rem, 50vw);
					`}
				/>
			</div>
			<article
				css={css`
					display: flex;
					flex-direction: column;
					flex-grow: 0.25;

					row-gap: 4em;
					margin-left: auto;
				`}
				id={'projects'}
			>
				<ProjectsContext.Provider value={projectsDispatch}>
					{(() => {
						const group = ProjectsGroup.PRODUCT;
						return (
							<ProjectsSection group={group}>
								<ProjectCardForProduct
									description={'Player authentication service and frontend website for Daresay Games'}
									frameworks={[
										FrameworkLanguages.TYPESCRIPT,
										FrameworkAPIs.NODE,
										FrameworkAPIs.EXPRESS,
										FrameworkAPIs.REACT,
										FrameworkAPIs.WEBPACK,
									]}
									group={group}
									name={'daresaygames.com'}
									siteAnchorProps={{ href: 'https://daresaygames.com', title: 'Visit Daresay Games' }}
								/>
								<ProjectCardForProduct
									unreleased
									description={
										'Multiplayer game client, game server, matchmaker service, and backend API'
									}
									frameworks={[
										FrameworkLanguages.C_SHARP,
										FrameworkAPIs.UNITY,
										FrameworkLanguages.GO,
										FrameworkTechnologies.KUBERNETES,
										FrameworkCloudPlatforms.GCP,
									]}
									group={group}
									name={'Blitz Arena'}
								/>
							</ProjectsSection>
						);
					})()}
					{(() => {
						const group = ProjectsGroup.FEATURED;
						return (
							<ProjectsSection group={group}>
								<ProjectCardForRepository
									frameworks={[
										FrameworkLanguages.TYPESCRIPT,
										FrameworkAPIs.NODE,
										FrameworkDatabases.REDIS,
										FrameworkLanguages.LUA,
									]}
									group={group}
									repository={{
										owner: { name: 'rahil-p', anchorProps: { title: 'Visit me on GitHub' } },
										name: 'connect-redis-session',
										description: 'Redis session storage for Node.js and Express.js',
									}}
								/>
							</ProjectsSection>
						);
					})()}
					{(() => {
						const group = ProjectsGroup.CONTRIBUTIONS;
						return (
							<ProjectsSection group={group}>
								<ProjectCardForRepository
									frameworks={[
										FrameworkLanguages.GO,
										FrameworkTechnologies.NGINX,
										FrameworkTechnologies.KUBERNETES,
									]}
									group={group}
									repository={{
										owner: {
											name: 'kubernetes',
											anchorProps: { title: 'Visit Kubernetes on Github' },
										},
										name: 'ingress-nginx',
										description: 'Kubernetes ingress controller implemented with NGINX',
									}}
									siteAnchorProps={{
										href: 'https://kubernetes.github.io/ingress-nginx',
										title: 'Visit documentation website',
									}}
								/>
								<ProjectCardForRepository
									frameworks={[FrameworkTechnologies.HELM, FrameworkTechnologies.KUBERNETES]}
									group={group}
									repository={{
										owner: {
											name: 'googleforgames',
											anchorProps: { title: 'Visit Google For Games on Github' },
										},
										name: 'agones',
										description:
											'Kubernetes framework for hosting and scaling dedicated game servers',
									}}
									siteAnchorProps={{ href: 'https://agones.dev', title: 'Visit the Agones website' }}
								/>
							</ProjectsSection>
						);
					})()}
				</ProjectsContext.Provider>
			</article>
		</div>
	);
}

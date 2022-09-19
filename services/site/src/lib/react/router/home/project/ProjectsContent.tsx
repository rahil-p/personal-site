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

export default function ProjectsContent() {
	const projectsDispatch = useProjectsDispatch();

	return (
		<div
			css={css`
				position: relative;
				display: flex;
			`}
		>
			<div
				css={css`
					position: absolute;
					left: -37.5%;
					height: 100%;
					clip-path: inset(0);

					@media (max-width: 1000px) {
						left: -30%;
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
										'Multiplayer game client, game server, matchmaker service, and backing APIs'
									}
									frameworks={[
										FrameworkLanguages.C_SHARP,
										FrameworkAPIs.UNITY,
										FrameworkLanguages.GO,
										FrameworkTechnologies.KUBERNETES,
										FrameworkCloudPlatforms.GCP,
									]}
									group={group}
									name={'Drift Arena'}
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
										FrameworkAPIs.EXPRESS,
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
								<ProjectCardForRepository
									frameworks={[
										FrameworkLanguages.TYPESCRIPT,
										FrameworkAPIs.REACT,
										FrameworkAPIs.WEBPACK,
										FrameworkTechnologies.NGINX,
										FrameworkTechnologies.DOCKER,
										FrameworkTechnologies.TERRAFORM,
									]}
									group={group}
									repository={{
										owner: { name: 'rahil-p', anchorProps: { title: 'Visit me on GitHub' } },
										name: 'personal-site',
										description: 'Code used to build and maintain this website',
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
										description: 'Kubernetes ingress controller implemented with Nginx',
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

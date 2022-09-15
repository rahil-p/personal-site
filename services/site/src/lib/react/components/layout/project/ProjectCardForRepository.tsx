import ProjectCard from './ProjectCard';
import ProjectCardFrameworks from './ProjectCardFrameworks';
import ProjectCardNav from './ProjectCardNav';
import ProjectCardTitle from './ProjectCardTitle';
import ProjectCardTitleHeading from './ProjectCardTitleHeading';
import ProjectCardTitleRepositoryOwner from './ProjectCardTitleRepositoryOwner';
import ProjectCardDescription from './ProjectCardDescription';

import type { ProjectsGroup } from '../../../hooks/projects';
import type { Framework } from './ProjectCardFrameworks';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
	group: ProjectsGroup;
	repository: {
		owner: {
			name: string;
			anchorProps?: ComponentPropsWithoutRef<'a'>;
		};
		name: string;
		description: string;
		anchorProps?: ComponentPropsWithoutRef<'a'>;
	};
	siteAnchorProps?: ComponentPropsWithoutRef<'a'>;
	frameworks: Framework[];
}

export default function ProjectCardForRepository(props: Props) {
	const { group, repository, siteAnchorProps, frameworks, ...delegatedProps } = props;

	const repositoryOwnerUrl = `https://github.com/${repository.owner.name}`;
	const repositoryUrl = `${repositoryOwnerUrl}/${repository.name}`;

	return (
		<ProjectCard group={group} name={`${repository.owner.name}/${repository.name}`} {...delegatedProps}>
			<ProjectCardFrameworks frameworks={frameworks} />
			<ProjectCardTitle>
				<ProjectCardTitleRepositoryOwner
					anchorProps={{
						href: repositoryOwnerUrl,
						title: `Visit ${repository.owner.name} on Github`,
						...repository.owner.anchorProps,
					}}
					name={repository.owner.name}
				/>
				<ProjectCardTitleHeading
					anchorProps={{ href: repositoryUrl, title: 'Visit repository', ...repository.anchorProps }}
					name={repository.name}
				/>
				<ProjectCardNav repositoryAnchorProps={{ href: repositoryUrl }} siteAnchorProps={siteAnchorProps} />
			</ProjectCardTitle>
			<ProjectCardDescription description={repository.description} />
		</ProjectCard>
	);
}

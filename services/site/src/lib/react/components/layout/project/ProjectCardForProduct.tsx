import ProjectCard from './ProjectCard';
import ProjectCardFrameworks from './ProjectCardFrameworks';
import ProjectCardNav from './ProjectCardNav';
import ProjectCardTitle from './ProjectCardTitle';
import ProjectCardTitleHeading from './ProjectCardTitleHeading';
import ProjectCardDescription from './ProjectCardDescription';

import type { ProjectsGroup } from '../../../hooks/projects';
import type { Framework } from './ProjectCardFrameworks';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
	group: ProjectsGroup;
	name: string;
	description: string;
	frameworks: Framework[];
	siteAnchorProps?: ComponentPropsWithoutRef<'a'>;
	unreleased?: boolean;
}

export default function ProjectCardForProduct(props: Props) {
	const { group, name, description, frameworks, siteAnchorProps, unreleased, ...delegatedProps } = props;

	return (
		<ProjectCard group={group} name={name} {...delegatedProps}>
			<ProjectCardFrameworks frameworks={frameworks} />
			<ProjectCardTitle>
				<ProjectCardTitleHeading anchorProps={siteAnchorProps} name={name} />
				<ProjectCardNav siteAnchorProps={siteAnchorProps} unreleased={unreleased} />
			</ProjectCardTitle>
			<ProjectCardDescription description={description} />
		</ProjectCard>
	);
}

import { css } from '@emotion/react';

import InlineList from '../../../components/layout/InlineList';

import type { ComponentPropsWithoutRef } from 'react';
import type { CSSExtra } from '../../../../common/types';

export enum FrameworkLanguages {
	TYPESCRIPT = 'Typescript',
	JAVASCRIPT = 'Javascript',
	PYTHON = 'Python',
	GO = 'Go',
	C_SHARP = 'C#',
	LUA = 'Lua',
}

export enum FrameworkAPIs {
	NODE = 'Node.js',
	EXPRESS = 'Express.js',
	REACT = 'React.js',
	WEBPACK = 'Webpack',
	UNITY = 'Unity',
	GRPC = 'gRPC',
}

export enum FrameworkDatabases {
	MONGODB = 'MongoDB',
	REDIS = 'Redis',
	SQL = 'SQL',
}

export enum FrameworkTechnologies {
	DOCKER = 'Docker',
	KUBERNETES = 'Kubernetes',
	TERRAFORM = 'Terraform',
	HELM = 'Helm',
	NGINX = 'Nginx',
}

export enum FrameworkCloudPlatforms {
	GCP = 'Google Cloud Platform',
}

export type Framework =
	| FrameworkLanguages
	| FrameworkAPIs
	| FrameworkDatabases
	| FrameworkCloudPlatforms
	| FrameworkTechnologies;

interface Props extends ComponentPropsWithoutRef<'ul'> {
	frameworks: Framework[];
	cssExtra?: CSSExtra;
}

export default function ProjectCardFrameworks(props: Props) {
	const { frameworks, cssExtra, ...delegatedProps } = props;

	return (
		<InlineList cssExtra={cssExtra} items={frameworks.map(el => [el, el])} role={'list'} {...delegatedProps}>
			{frameworks.map(framework => {
				return (
					<li
						key={framework}
						css={css`
							font-size: 0.85em;
						`}
					>
						{framework}
					</li>
				);
			})}
		</InlineList>
	);
}

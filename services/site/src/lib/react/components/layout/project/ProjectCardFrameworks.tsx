import { css, useTheme } from '@emotion/react';

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

	const theme = useTheme();

	// const [reveal] = useState(false);

	return (
		<ul
			css={[
				css`
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					column-gap: 1.5em;
					padding: 0;
					margin: 0;
					font-family: _dm, monospace;
					color: ${theme.colors.greyscale.i6};
					transition: height var(--ease-time) var(--ease-fn);
				`,
				cssExtra,
			]}
			role={'list'}
			{...delegatedProps}
		>
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
		</ul>
	);
}

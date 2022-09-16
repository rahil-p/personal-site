import { css, useTheme } from '@emotion/react';

interface Props {
	description: string;
}

export default function ProjectCardDescription(props: Props) {
	const { description } = props;

	const theme = useTheme();

	return (
		<p
			css={css`
				color: ${theme.colors.greyscale.i6};
			`}
		>
			{description}
		</p>
	);
}

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
				font-size: clamp(0.8rem, 2.325vw, 0.875rem);
				color: ${theme.colors.greyscale.i6};
			`}
		>
			{description}
		</p>
	);
}

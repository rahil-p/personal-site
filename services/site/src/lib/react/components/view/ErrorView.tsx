import { css, useTheme } from '@emotion/react';

import { useMetaTemplate } from '../../hooks/dom';

export interface Props {
	errorStatus?: string;
	errorMessage?: string;
}

export default function ErrorView(props: Props) {
	const { errorStatus, errorMessage } = props;

	const theme = useTheme();

	const meta = useMetaTemplate();

	return (
		<div>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: 700;
					text-transform: uppercase;
					user-select: none;
				`}
			>
				<span
					css={css`
						font-size: max(min(20vw, 20vh), 1.75rem);
						line-height: 1;
						color: ${theme.colors.accent.error};
						letter-spacing: 0.08em;

						@media (max-width: 250px) {
							font-size: 3.125rem;
						}
					`}
				>
					{meta.current['rp:template:error:status'] ?? errorStatus ?? 'Yikes'}
				</span>
				<span
					css={css`
						margin-top: 1.25em;
						font-size: clamp(0.625rem, 1.8vw, 1.8vh);
						letter-spacing: 0.25em;
					`}
				>
					{meta.current['rp:template:error:message'] ?? errorMessage ?? 'Something went wrong'}
				</span>
			</div>
		</div>
	);
}

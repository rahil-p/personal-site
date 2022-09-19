import { css, useTheme } from '@emotion/react';

import ContentHeading from '../../../components/layout/ContentHeading';

export default function GeneralContent() {
	const theme = useTheme();

	return (
		<div
			css={css`
				padding: 0 var(--padding-h-main);
				text-align: right;
			`}
		>
			<ContentHeading>General</ContentHeading>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					row-gap: 1em;
					color: ${theme.colors.main.colorSoft};

					& .general__content--nowrap {
						display: inline-block;
					}
				`}
			>
				<p>
					I studied mathematics and statistics as an undergraduate at{' '}
					<span className={'general__content--nowrap'}>Columbia University.</span>
				</p>
				<p>
					In 2016, I completed a 2189-mile thru-hike of the{' '}
					<span className={'general__content--nowrap'}>Appalachian Trail.</span>
				</p>
			</div>
		</div>
	);
}

import { css } from '@emotion/react';

import { decimalToFraction } from '../helpers/math';

export const aspectRatioWithFallback = (ratio: number) => {
	const [w, h] = decimalToFraction(ratio);

	return css`
		aspect-ratio: 1/1;

		@supports not (aspect-ratio: auto) {
			&::before {
				float: left;
				padding-top: calc(100% * ${h} / ${w});
				content: '';
			}

			&::after {
				display: block;
				content: '';
				clear: both;
			}
		}
	`;
};

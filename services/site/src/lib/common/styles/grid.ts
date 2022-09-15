import { css } from '@emotion/react';

import type { SerializedStyles } from '@emotion/react';

export const gridStyleWithCenteredRows = (columns: number) => {
	const span = 2;
	const rowCenter = (columns * span) / 2;

	const styles: Array<SerializedStyles> = [
		css`
			grid-column: span ${span};
		`,
	];

	for (let i = 1; i < columns; i += 1) {
		const rowStart = rowCenter - (i * span) / 2;
		for (let j = 1; j <= i; j += 1) {
			const k = i - j + 1;
			styles.push(css`
				&:nth-of-type(${columns}n + ${j})${k === 1 ? ':last-of-type' : `:nth-last-of-type(${k})`} {
					grid-column-end: ${1 + rowStart + span * j};
				}
			`);
		}
	}

	return [
		css`
			display: grid;
			grid-template-columns: repeat(${columns * span}, 1fr);
		`,
		css(styles),
	];
};

import { css } from '@emotion/react';

import { useScrollOnMount } from '../../hooks/dom';

import type { CSSExtra } from '../../../common/types';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

export interface Props extends ComponentPropsWithoutRef<'main'> {
	children?: ReactElement | (ReactElement | null | undefined)[];
	cssExtra?: CSSExtra;
}

export default function Main(props: Props) {
	const { cssExtra, children, ...delegatedProps } = props;

	useScrollOnMount();

	return (
		<main
			css={[
				css`
					position: relative;
					flex-grow: 99;
					width: 100%;
				`,
				cssExtra,
			]}
			{...delegatedProps}
		>
			{children}
		</main>
	);
}

import { useCallback, useEffect, useState } from 'react';

import { css, useTheme } from '@emotion/react';

import type { ComponentPropsWithoutRef } from 'react';
import type { CSSExtra } from '../../../common/types';

interface Props extends ComponentPropsWithoutRef<'button'> {
	minY?: number;
	cssExtra?: CSSExtra;
}

export default function ScrollToTopButton(props: Props) {
	const { cssExtra, minY = 0, onClick, ...delegatedAttributes } = props;

	const theme = useTheme();

	const [show, setShow] = useState(window.scrollY >= minY);

	const onScroll = useCallback(() => {
		setShow(window.scrollY >= minY);
	}, [minY]);

	useEffect(() => {
		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);

	return (
		<button
			className={show ? undefined : 'hide'}
			css={[
				css`
					color: inherit;
					opacity: 1;
					transition: opacity var(--ease-time) var(--ease-fn), color var(--ease-time) var(--ease-fn);

					&.hide {
						opacity: 0;
					}

					&:hover {
						color: ${theme.colors.accent.interactive0};
					}
				`,
				cssExtra,
			]}
			type={'button'}
			{...delegatedAttributes}
			title={'Scroll to top'}
			onClick={e => {
				onClick?.(e);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
		>
			↑{/*	TODO: Add graphic */}
		</button>
	);
}

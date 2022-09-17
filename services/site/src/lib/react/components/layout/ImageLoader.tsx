import { useState } from 'react';

import { css, keyframes, useTheme } from '@emotion/react';

import type { CSSExtra } from '../../../common/types';
import type { LazyLoadImageProps } from 'react-lazy-load-image-component';
import type { ComponentPropsWithoutRef, ReactElement, Dispatch, SetStateAction } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {
	render: (setImageLoaded: Dispatch<SetStateAction<boolean>>) => ReactElement<LazyLoadImageProps>;
	cssExtra?: CSSExtra;
}

const shineKeyframes = keyframes`
	from {
		transform: translate(-250%) rotate(20deg);
	}
  
	to {
		transform: translateX(250%) rotate(20deg);
	}
`;

export default function ImageLoader(props: Props) {
	const { render, cssExtra, ...delegatedProps } = props;

	const theme = useTheme();

	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div
			css={[
				css`
					position: relative;
					width: 2.5em;
					height: 2.5em;
					overflow: hidden;
					background-color: ${theme.colors.main.backgroundAlt};
					border-radius: 99rem;

					&::after {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						content: '';
						background-color: ${theme.colors.main.colorSofter};
						filter: blur(20px);
						opacity: 0.5;
						animation: ${shineKeyframes} 3s ease-in-out infinite;
					}
				`,
				imageLoaded
					? css`
							background: none;

							&::after {
								display: none;
							}
					  `
					: undefined,
				cssExtra,
			]}
			{...delegatedProps}
		>
			{render(setImageLoaded)}
		</div>
	);
}

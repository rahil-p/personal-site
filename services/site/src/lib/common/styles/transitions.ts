import { css } from '@emotion/react';

export const fadeTransitionStyle = css`
	--transition-speed-multiplier: 1;

	&.fade-enter,
	&.fade-appear {
		opacity: 0;
	}

	&.fade-enter-active,
	&.fade-appear-active {
		opacity: 1;
		transition: opacity calc(var(--ease-time) * var(--transition-speed-multiplier)) var(--ease-fn);
	}

	&.fade-exit {
		opacity: 1;
	}

	&.fade-exit-active {
		opacity: 0;
		transition: opacity calc(var(--ease-time) * var(--transition-speed-multiplier)) var(--ease-fn-inverse);
	}
`;

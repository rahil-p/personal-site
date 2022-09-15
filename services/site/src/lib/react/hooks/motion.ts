import { useCallback, useEffect, useState } from 'react';

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

export const useReducedMotionPreference = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(mediaQuery.matches);

	const onPreferenceChange = useCallback((e: MediaQueryListEvent) => {
		setPrefersReducedMotion(e.matches);
	}, []);

	useEffect(() => {
		mediaQuery.addEventListener('change', onPreferenceChange);

		return () => {
			mediaQuery.removeEventListener('change', onPreferenceChange);
		};
	}, [onPreferenceChange]);

	return prefersReducedMotion;
};

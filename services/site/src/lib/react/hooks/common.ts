import { useEffect, useRef } from 'react';

import type { Ref } from 'react';

export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
};

export const useUpdate = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
	const ref = useRef(true);

	useEffect(() => {
		if (ref.current) {
			ref.current = false;
			return undefined;
		}

		return effect();
	}, deps);
};

export const useForwardedRef = <T>(ref: Ref<T> | Ref<T>[]) => {
	const innerRef = useRef<T>(null);

	const refs = Array.isArray(ref) ? ref : [ref];

	useEffect(() => {
		refs.forEach(el => {
			if (!el) return;
			if (typeof el === 'function') {
				el(innerRef.current);
			} else {
				// eslint-disable-next-line no-param-reassign
				(el as React.MutableRefObject<T | null>).current = innerRef.current;
			}
		});
	});

	return innerRef;
};

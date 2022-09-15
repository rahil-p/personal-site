import { useEffect, useRef, useState } from 'react';

import { useLocation } from 'react-router-dom';

import type { RefObject } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	onClickOutside?: (event: MouseEvent) => void,
	ref?: RefObject<T>,
) {
	const _ref = useRef<T>(null);
	const handlerRef = ref ?? _ref;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!onClickOutside) return;
			if (!handlerRef.current?.contains(event.target as Node)) {
				onClickOutside(event);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClickOutside, handlerRef]);

	return handlerRef;
}

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
	callback: ResizeObserverCallback,
	ref?: RefObject<T>,
) {
	const _ref = useRef<T>(null);
	const handlerRef = ref ?? _ref;

	const observerRef = useRef<ResizeObserver>();

	useEffect(() => {
		if (!handlerRef.current) return undefined;
		observerRef.current = new ResizeObserver(callback);

		observerRef.current.observe(handlerRef.current);
		return () => {
			observerRef.current?.disconnect();
		};
	}, [handlerRef, callback]);

	return [handlerRef, observerRef];
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
	callback: IntersectionObserverCallback,
	ref?: RefObject<T>,
) {
	const _ref = useRef<T>(null);
	const handlerRef = ref ?? _ref;

	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		if (!handlerRef.current) return undefined;
		observerRef.current = new IntersectionObserver(callback);

		observerRef.current.observe(handlerRef.current);
		return () => {
			observerRef.current?.disconnect();
		};
	}, [handlerRef, callback]);

	return [handlerRef, observerRef];
}

export enum ScrollDirection {
	NEGATIVE = -1,
	NONE = 0,
	POSITIVE = 1,
}

export function useScrollDirection(threshold = 1) {
	const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(ScrollDirection.NONE);
	const location = useLocation();

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const updateScrollDirection = () => {
			const { scrollY } = window;

			const direction = scrollY > lastScrollY ? ScrollDirection.POSITIVE : ScrollDirection.NEGATIVE;
			if (
				direction !== scrollDirection &&
				(scrollY - lastScrollY > threshold || scrollY - lastScrollY < -threshold)
			) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};

		window.addEventListener('scroll', updateScrollDirection); // add event listener
		return () => {
			window.removeEventListener('scroll', updateScrollDirection); // clean up
		};
	}, [scrollDirection, threshold]);

	useEffect(() => {
		setScrollDirection(ScrollDirection.NONE);
	}, [location]);

	return scrollDirection;
}

export function useScrollOnMount(toLocationOptions?: ScrollToOptions | boolean, toHashOptions?: ScrollToOptions) {
	const location = useLocation();

	// Cannot bail out of this one
	useEffect(() => {
		const { hash } = window.location;
		if (!hash) return;
		const target = document.getElementById(hash.substring(1));
		target?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'start',
			...toHashOptions,
		});
	}, [location, toHashOptions]);

	// Can bail out of this one
	useEffect(() => {
		if (window.location.hash || !toLocationOptions) return;

		if (window.location.hash) return;

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant' as ScrollBehavior,
			...(toLocationOptions === true ? {} : toLocationOptions),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export function getMeta() {
	const tags = document.head.querySelectorAll<HTMLMetaElement>('meta[property^="rp:"]');

	return [...tags].reduce((acc, curr) => {
		const property = curr.getAttribute('property');
		if (property === null) return acc;
		acc[property] = curr.content;
		return acc;
	}, {} as Record<string, string | undefined>);
}

export function useMetaTemplate() {
	const ref = useRef<Record<string, string | undefined>>(getMeta());
	return ref;
}

export function useCSSVariable<T extends HTMLElement>(variable: string, ref?: RefObject<T>) {
	const element = ref?.current ?? document.body;

	return window.getComputedStyle(element).getPropertyValue(variable);
}

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'rp::darkMode';

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const getSessionPreference = () => window.sessionStorage.getItem(STORAGE_KEY);
const setSessionPreference = (enable: boolean) => window.sessionStorage.setItem(STORAGE_KEY, enable ? '1' : '');
const getSystemPreference = () => mediaQuery.matches;
const evaluatePreference = () => {
	const sessionPreference = getSessionPreference();
	if (sessionPreference !== null) return !!sessionPreference;
	return getSystemPreference();
};

export const darkTheme = {
	colors: {
		main: {
			background: '#131517',
			backgroundAlt: '#27272c',
			color: '#ffffff',
			colorDim: '#b9b6b6',
		},
		accent: {
			main0: '#33cc99',
			alt0: '#a8ffec',
			blobR: '#ff0000',
			blobG: '#00ff00',
			blobB: '#0000ff',
		},
		greyscale: {
			i0: '#000000',
			i1: '#111111',
			i2: '#333333',
			i3: '#555555',
			i4: '#777777',
			i5: '#999999',
			i6: '#bbbbbb',
			i7: '#dddddd',
			i8: '#ffffff',
		},
	},
};

export const lightTheme = darkTheme;

export const useDarkModeDispatch = () => {
	const [darkMode, _setDarkMode] = useState(evaluatePreference());

	const dispatch = {
		darkMode,
		setDarkMode(this: void, enable: boolean) {
			setSessionPreference(enable);
			_setDarkMode(enable);
		},
		getTheme(this: void) {
			return darkMode ? darkTheme : lightTheme;
		},
	};

	// Listen for system preference changes
	const onSystemPreferenceChange = useCallback((e: MediaQueryListEvent) => {
		const sessionPreference = getSessionPreference();
		if (sessionPreference !== null) return;

		_setDarkMode(e.matches);
	}, []);

	// Listen for session preference changes (e.g. cleared session from browser or device settings)
	const onSessionPreferenceChange = useCallback((e: StorageEvent) => {
		// Bail if key does not match and is non-null (null indicates cleared storage)
		if (e.key !== STORAGE_KEY && e.key !== null) return;
		const enable = e.newValue !== null ? !!e.newValue : getSystemPreference();

		_setDarkMode(enable);
	}, []);

	useEffect(() => {
		// TODO: only register this event listener if a session preference has not already been set
		mediaQuery.addEventListener('change', onSystemPreferenceChange);

		return () => {
			mediaQuery.removeEventListener('change', onSystemPreferenceChange);
		};
	}, [onSystemPreferenceChange]);

	useEffect(() => {
		window.addEventListener('storage', onSessionPreferenceChange);

		return () => {
			window.removeEventListener('storage', onSessionPreferenceChange);
		};
	}, [onSessionPreferenceChange]);

	return dispatch;
};

export type DarkModeDispatch = ReturnType<typeof useDarkModeDispatch>;

export const DarkModeContext = createContext<DarkModeDispatch>(null as unknown as DarkModeDispatch);

export const useDarkMode = () => {
	const context = useContext(DarkModeContext);

	return context;
};

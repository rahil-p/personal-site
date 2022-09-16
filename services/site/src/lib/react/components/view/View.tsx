import { useRef } from 'react';

import { css, CacheProvider, ThemeProvider, Global } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CSSTransition } from 'react-transition-group';

import { DarkModeContext, useDarkModeDispatch } from '../../hooks/theme';
import { useMetaTemplate } from '../../hooks/dom';
import { fadeTransitionStyle } from '../../../common/styles/transitions';

import type { ReactElement } from 'react';
import type Main from './Main';

export interface Props {
	children: ReactElement<typeof Main>;
}

function View(props: Props) {
	const { children } = props;

	const meta = useMetaTemplate();
	const cacheRef = useRef(
		createCache({
			key: 'css',
			nonce: meta.current['rp:style:key'],
			stylisPlugins: [prefixer],
		}),
	);

	const darkModeDispatch = useDarkModeDispatch();
	const { darkMode, getTheme } = darkModeDispatch;
	const theme = getTheme();

	return (
		<CacheProvider value={cacheRef.current}>
			<ThemeProvider theme={theme}>
				<DarkModeContext.Provider value={darkModeDispatch}>
					<Global
						styles={css`
							html,
							body {
								color: ${theme.colors.main.color};
								background-color: ${theme.colors.main.background};
								scrollbar-color: ${darkMode ? 'light' : 'dark'};
							}
						`}
					/>

					<CSSTransition
						appear
						in
						addEndListener={(node, done) => {
							node.addEventListener('transitionend', done, false);
						}}
						classNames={'fade'}
						css={fadeTransitionStyle}
					>
						<div
							className={'slow'}
							css={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								min-height: 100vh;
							`}
						>
							{children}
						</div>
					</CSSTransition>
				</DarkModeContext.Provider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default View;

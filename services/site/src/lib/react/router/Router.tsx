import { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import * as Sentry from '@sentry/react';

import View from '../components/view/View';
import Loader from '../components/view/Loader';
import ErrorView from '../components/view/ErrorView';

import type { ReactElement } from 'react';
import type { Props } from '../components/view/Loader';

const HomeRoute = lazy(() => import('./home/Route'));
const ErrorRoute = lazy(() => import('./error/Route'));

function Layout() {
	return (
		<View>
			<Outlet />
		</View>
	);
}

function LazyView(props: { element: ReactElement; fallbackProps?: Props }) {
	const { element, fallbackProps } = props;

	return (
		<Sentry.ErrorBoundary
			fallback={
				<div
					css={css`
						position: absolute;
						top: 0;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						height: 100%;
					`}
				>
					<ErrorView errorMessage={'Something went wrong'} errorStatus={'#$%!'} />
				</div>
			}
		>
			<Suspense fallback={<Loader {...fallbackProps} />}>{element}</Suspense>
		</Sentry.ErrorBoundary>
	);
}

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function RouteHandler() {
	return (
		<BrowserRouter>
			<SentryRoutes>
				<Route element={<Layout />} path={'/'}>
					<Route index element={<LazyView element={<HomeRoute />} />} />
					<Route element={<LazyView element={<ErrorRoute />} />} path={'*'} />
				</Route>
			</SentryRoutes>
		</BrowserRouter>
	);
}

export default Sentry.withProfiler(RouteHandler);

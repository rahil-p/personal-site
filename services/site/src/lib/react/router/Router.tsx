import { lazy } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import ErrorRoute from './error/ErrorRoute';
import Layout from './Layout';
import LazyRoute from './LazyRoute';

const HomeRoute = lazy(() => import('./home/HomeRoute'));

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function RouteHandler() {
	return (
		<BrowserRouter>
			<SentryRoutes>
				<Route element={<Layout />} path={'/'}>
					<Route index element={<LazyRoute element={<HomeRoute />} />} />
					<Route element={<ErrorRoute />} path={'*'} />
				</Route>
			</SentryRoutes>
		</BrowserRouter>
	);
}

export default Sentry.withProfiler(RouteHandler);

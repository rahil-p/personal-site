import { useEffect } from 'react';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';
import { ExtraErrorData } from '@sentry/integrations';

import { getMeta } from '../../react/hooks/dom';

const meta = getMeta();

Sentry.init({
	dsn: meta['rp:sentry:dsn'],
	release: (() => {
		const project = meta['rp:sentry:project'];
		const version = process.env.SITE_PACKAGE_VERSION;
		return project && version ? `${project}@${version}` : undefined;
	})(),
	environment: meta['rp:sentry:env'],
	integrations: [
		new BrowserTracing({
			routingInstrumentation: Sentry.reactRouterV6Instrumentation(
				useEffect,
				useLocation,
				useNavigationType,
				createRoutesFromChildren,
				matchRoutes,
			),
		}),
		new ExtraErrorData({
			depth: 3,
		}),
	],
	sampleRate: parseInt(meta['rp:sentry:errors:sample-rate'] ?? '', 10) || 1.0,
	tracesSampleRate: parseInt(meta['rp:sentry:traces:sample-rate'] ?? '', 10) || 0.25,
});

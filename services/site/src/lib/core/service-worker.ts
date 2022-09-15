import { setCacheNameDetails } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { initialize as initializeGoogleAnalytics } from 'workbox-google-analytics';

import type { WorkboxPlugin } from 'workbox-core';

const bgSyncPlugin = new BackgroundSyncPlugin('rp-queue', {
	maxRetentionTime: 2, // (mins)
}) as WorkboxPlugin;

setCacheNameDetails({
	prefix: 'rp',
	precache: 'precache',
	runtime: 'runtime',
	googleAnalytics: 'ga',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST); // eslint-disable-line no-restricted-globals,@typescript-eslint/no-unsafe-argument
cleanupOutdatedCaches();

registerRoute(
	({ request }) => request.destination === 'image',
	new StaleWhileRevalidate({
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			bgSyncPlugin,
		],
	}),
);

registerRoute(
	/manifest\.webmanifest/,
	new StaleWhileRevalidate({
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			bgSyncPlugin,
		],
	}),
);

initializeGoogleAnalytics();

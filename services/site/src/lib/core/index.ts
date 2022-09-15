const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/scripts/service-worker.js', {
				scope: '/',
			})
			.catch(regError => {
				console.warn('SW registration failed: ', regError); // eslint-disable-line no-console
			});
	}
};

// eslint-disable-next-line no-console
console.log('Cheers, friend');
registerServiceWorker();

exports.htmlMinify = (config = {}) => ({
	collapseWhitespace: true,
	removeComments: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	useShortDoctype: true,
	...config,
});

exports.getType = entry => {
	if (/\.html$/.test(entry)) return 'document';
	if (/\.css$/.test(entry)) return 'style';
	if (/\.woff2?$/.test(entry)) return 'font';
	if (/\.png$/.test(entry)) return 'image';
	if (/\.(wasm|data)$/.test(entry)) return 'fetch';
	return 'script';
};

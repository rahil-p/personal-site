require('dotenv').config();

const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('sass');
//
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, EnvironmentPlugin, ProvidePlugin } = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SentryReleasePlugin = require('@sentry/webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');

const { htmlMinify, getType } = require('./webpack/utils');
const { templateParameters, httpErrors } = require('./webpack/params');
const pkg = require('./package.json');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
	mode: devMode ? 'development' : 'production',
	entry: {
		style: './src/sass/main.scss',
		core: './src/lib/core/index.ts',
		router: {
			import: './src/lib/react/router/index.ts',
			dependOn: ['style', 'core'],
		},
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			buffer: require.resolve('buffer'),
		},
	},
	output: {
		// https://webpack.js.org/configuration/output/#template-strings
		path: path.resolve('dist/rahil-p.com'),
		publicPath: '/',
		assetModuleFilename: 'assets/[name].[contenthash][ext]',
		chunkFilename: 'scripts/[id].[contenthash].chunk.js',
		filename: 'scripts/[name].[contenthash].bundle.js',
		hashDigestLength: 6,
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: [
								[require.resolve('@babel/preset-env')],
								[
									require.resolve('@babel/preset-react'),
									{
										development: devMode,
										useSpread: true,
										runtime: 'automatic',
										importSource: '@emotion/react',
									},
								],
								[require.resolve('@babel/preset-typescript')],
							],
							plugins: [
								[require.resolve('@babel/plugin-transform-runtime')],
								[require.resolve('@emotion/babel-plugin')],
							],
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: require.resolve('@webdiscus/pug-loader'),
						options: {
							pretty: devMode,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/',
						},
					},
					require.resolve('css-loader'),
					{
						// Transpiles CSS using PostCSS (Autoprefixer + CSSNano)
						loader: require.resolve('postcss-loader'),
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									autoprefixer(),
									cssnano({
										preset: [
											require.resolve('cssnano-preset-advanced'),
											{
												discardUnused: { fontFace: false },
												zindex: false,
											},
										],
									}),
								],
							},
						},
					},
					{
						// Compiles Sass to CSS
						loader: require.resolve('sass-loader'),
						options: {
							implementation: sass,
							sourceMap: true,
							sassOptions: {
								sourceMapContents: true,
							},
						},
					},
				],
			},
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /file/,
						type: 'asset/resource',
					},
					{
						resourceQuery: /data/,
						type: 'asset/inline',
					},
					{
						resourceQuery: /.*/,
						use: [
							{
								loader: require.resolve('@svgr/webpack'),
								options: {
									typescript: true,
									enforce: 'pre',
									svgoConfig: {
										plugins: [
											{
												name: 'preset-default',
												params: {
													overrides: {
														cleanupIDs: {
															prefix: {
																toString() {
																	this.counter = this.counter || 0;
																	// eslint-disable-next-line no-plusplus
																	return `id-${this.counter++}`;
																},
															},
														},
														removeHiddenElems: false,
													},
												},
											},
										],
									},
								},
							},
						],
					},
				],
			},
			{
				test: /\.json$/,
				resourceQuery: /file/,
				type: 'asset/resource',
			},
			{
				test: /manifest\.json$/,
				type: 'asset/resource',
				use: [
					{
						loader: require.resolve('string-replace-loader'),
						options: {
							multiple: [
								{
									search: /(?<="src":\s*")assets\//g,
									replace: '',
									strict: true,
								},
								{
									search: /(?<="version":\s*").*?(?=")/,
									replace: pkg.version,
									strict: true,
								},
							],
						},
					},
					require.resolve('webpack-webmanifest-loader'),
				],
			},
			{
				test: /\.(woff2|png|ico|mp4)$/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		/* HTML builders */
		new HtmlWebpackPlugin({
			filename: `index.html`,
			template: 'src/pug/index.pug',
			minify: devMode ? false : htmlMinify({ removeComments: false }),
			inject: 'head',
			chunks: ['style', 'core', 'router'],
			scriptLoading: 'defer',
			templateParameters: { ...templateParameters, page: {} },
		}),
		...Object.entries(httpErrors).map(
			([errorStatus, errorMessage]) =>
				new HtmlWebpackPlugin({
					filename: `error/${errorStatus}.html`,
					template: 'src/pug/error.pug',
					minify: devMode ? false : htmlMinify({ removeComments: false }),
					inject: 'head',
					chunks: ['style', 'core', 'router'],
					scriptLoading: 'defer',
					templateParameters: {
						...templateParameters,
						page: { title: 'Error', data: { errorStatus, errorMessage } },
					},
				}),
		),
		/* Tree-shake Sentry */
		new DefinePlugin({
			__SENTRY_DEBUG__: false,
		}),
		/* Pass build arguments */
		new EnvironmentPlugin({
			NODE_ENV: devMode ? 'development' : 'production',
			SITE_PACKAGE_VERSION: pkg.version,
		}),
		/* Provide the NodeJS Buffer API to the build */
		new ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
		/* `<link rel='preload'>` injectors */
		new PreloadWebpackPlugin({
			include: {
				type: 'initial',
				chunks: ['style', 'core', 'router'],
			},
			fileBlacklist: [/^robots\.txt$/, /^.*\.map$/, /^.*\.png$/],
			as(entry) {
				return getType(entry);
			},
		}),
		/* Extracts compiled CSS to separate files */
		new MiniCssExtractPlugin({
			filename: `styles/[name].[contenthash].css`,
			attributes: { nonce: '**CSP_STYLE_NONCE**' },
		}),
		/* Removes empty chunks/scripts that are formed from style-only entries */
		// TODO: needs later review (MiniCssExtractPlugin emits empty scripts for style-only-entries)
		new RemoveEmptyScriptsPlugin(),
		new ScriptExtHtmlWebpackPlugin({
			custom: { test: /.*\.js/, attribute: 'nonce', value: '**CSP_SCRIPT_NONCE**' },
		}),
		/* Copies static assets to the output directory */
		new CopyPlugin({
			patterns: [
				{
					from: 'src/public/images/app',
					to: 'images/app',
				},
			],
		}),
		/* Plugins for compiling service worker files with configured precache URLs */
		// via `src/app.js`
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/lib/core/service-worker.ts',
			swDest: 'scripts/service-worker.js',
			chunks: ['style', 'core'],
			exclude: [/\.map$/, /^manifest.*\.js$/, /images\//],
			dontCacheBustURLsMatching: /\.[0-z]{6}\.(js|css)/,
		}),
		/* Configures a Sentry release */
		...(process.env.SENTRY_AUTH_TOKEN
			? [
					new SentryReleasePlugin({
						authToken: process.env.SENTRY_AUTH_TOKEN,
						org: process.env.SENTRY_ORG,
						project: process.env.SENTRY_PROJECT,
						release: `${process.env.SENTRY_PROJECT}@${pkg.version}`,
						entries: ['router'],
						include: 'dist',
						finalize: true,
						deploy: undefined,
						setCommits: {
							auto: true,
						},
					}),
			  ]
			: []),
		/* Writes bundle stats to file */
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: './bundle.stats.json',
		}),
	],
	devtool: 'source-map',
	optimization: {
		chunkIds: devMode ? 'named' : 'deterministic',
		splitChunks: {
			chunks: 'all',
		},
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: true,
					compress: false,
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new JsonMinimizerPlugin(),
		],
	},
};

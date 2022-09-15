import { css } from '@emotion/react';

type LayerCount = 1 | 2 | 3 | 4;

const getShadowLayers = (layers: LayerCount) => {
	const boxShadows = [];
	for (let i = 0; i < layers; i += 1) {
		const x = 0.75 * 2 ** i;
		boxShadows.push(`${x}px ${2 * x}px ${2 * x}px hsl(0deg 0% 0% / 50%)`);
	}

	return boxShadows;
};

export const boxShadow = (layers: LayerCount) => {
	const shadowLayers = getShadowLayers(layers);

	return css`
		box-shadow: ${shadowLayers.join(', ')};
	`;
};

export const svgShadow = (layers: LayerCount) => {
	const shadowLayers = getShadowLayers(layers);

	return css`
		filter: ${shadowLayers.map(layer => `drop-shadow(${layer})`).join(' ')};
	`;
};

import type { Keyframes, SerializedStyles } from '@emotion/react';

export default class StaggerHandler {
	initialDelay: number;
	incrementalDelay: number;
	keyframes: Keyframes;
	styleFn: (staggerDelay: number, keyframes: Keyframes) => SerializedStyles;

	private _n = 0;

	constructor(options: {
		initialDelay?: number;
		incrementalDelay?: number;
		keyframes: Keyframes;
		stylesFn: (staggerDelay: number, keyframes: Keyframes) => SerializedStyles;
	}) {
		this.initialDelay = options.initialDelay ?? 0;
		this.incrementalDelay = options.incrementalDelay ?? 50;
		this.keyframes = options.keyframes;
		this.styleFn = options.stylesFn;
	}

	get staggerStyle() {
		return this.styleFn(this.staggerDelay, this.keyframes);
	}

	private get staggerDelay() {
		const delay = this.initialDelay + this.incrementalDelay * this._n;
		this._n += 1;

		return delay;
	}

	reset() {
		this._n = 0;
	}
}

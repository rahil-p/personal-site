import type { SerializedStyles } from '@emotion/react';

export type Require<T, K extends keyof T> = T & {
	[Property in K]-?: T[Property];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type CSSExtra = SerializedStyles | undefined | CSSExtra[];

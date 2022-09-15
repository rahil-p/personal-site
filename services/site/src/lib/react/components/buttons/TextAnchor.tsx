import { isHrefExternal } from '../../../common/helpers/url';
import { textButtonStyle } from './TextButton';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

export interface Props extends ComponentPropsWithoutRef<'a'> {
	children: ReactNode;
	cssExtra?: CSSExtra;
}

export default function TextAnchor(props: Props) {
	const { children, cssExtra, href, ...delegatedAttributes } = props;

	return (
		<a
			css={[textButtonStyle, cssExtra]}
			href={href}
			rel={'noopener noreferrer'}
			role={'link'}
			target={isHrefExternal(href) ? '_blank' : undefined}
			{...delegatedAttributes}
		>
			{children}
		</a>
	);
}

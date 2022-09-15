import { NavLink } from 'react-router-dom';

import { textButtonStyle } from './TextButton';

import type { NavLinkProps } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { CSSExtra } from '../../../common/types';

export interface Props extends NavLinkProps {
	children: ReactNode;
	cssExtra?: CSSExtra;
}

export default function TextNavLink(props: Props) {
	const { children, cssExtra, ...delegatedProps } = props;

	return (
		<NavLink css={[textButtonStyle, cssExtra]} {...delegatedProps}>
			{children}
		</NavLink>
	);
}

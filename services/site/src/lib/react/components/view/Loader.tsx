import type { ReactNode } from 'react';

export type Props = {
	children?: ReactNode;
};

export default function Loader(props: Props) {
	const { children } = props;

	// TODO: implement a loader component
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
}

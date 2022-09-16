import { Suspense } from 'react';

import * as Sentry from '@sentry/react';

import Loader from '../components/view/Loader';
import ErrorRoute from './error/ErrorRoute';

import type { Props as LoaderProps } from '../components/view/Loader';
import type { ReactElement } from 'react';

interface Props {
	element: ReactElement;
	loaderProps?: LoaderProps;
}

export default function LazyRoute(props: Props) {
	const { element, loaderProps } = props;

	return (
		<Sentry.ErrorBoundary
			fallback={<ErrorRoute errorMessage={'Something went wrong'} errorStatus={'#$%!'} setMeta={false} />}
		>
			<Suspense fallback={<Loader {...loaderProps} />}>{element}</Suspense>
		</Sentry.ErrorBoundary>
	);
}

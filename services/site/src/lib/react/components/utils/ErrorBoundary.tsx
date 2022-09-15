import { Component } from 'react';

import type { ErrorInfo, ReactElement } from 'react';

interface Props {
	children: ReactElement | string | (ReactElement | string)[];
	fallback?: ReactElement | string | (ReactElement | string)[];
}

interface State {
	hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
	state = { hasError: false };

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// eslint-disable-next-line no-console
		console.error(error, errorInfo);
	}

	render() {
		const { fallback, children } = this.props;
		const { hasError } = this.state;

		if (hasError) {
			return fallback ?? <div />;
		}

		return children;
	}
}

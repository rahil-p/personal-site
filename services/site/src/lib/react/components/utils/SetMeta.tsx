import { Helmet } from 'react-helmet';

import type { ReactNode } from 'react';

interface Props {
	title?: string;
	description?: string;
	noindex?: boolean;
	nofollow?: boolean;
	nosnippet?: boolean;
	children?: ReactNode;
}

export default function SetMeta(props: Props) {
	const { title, description, noindex, nofollow, nosnippet, children } = props;

	const robots = (() => {
		const directives = [];
		if (noindex) directives.push('noindex');
		if (nofollow) directives.push('nofollow');
		if (nosnippet) directives.push('nosnippet');
		return directives.join(',');
	})();

	return (
		<>
			<Helmet>
				{...[
					...(title ? [<title key={'title'}>{title}</title>] : []),
					...(description ? [<meta key={'description'} content={description} name={'description'} />] : []),
					...(robots ? [<meta key={'robots'} content={robots} name={'robots'} />] : []),
				]}
			</Helmet>
			<Helmet>{children}</Helmet>
		</>
	);
}

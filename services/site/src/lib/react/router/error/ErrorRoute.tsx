import { css, useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';

import Main from '../../components/view/Main';
import ErrorView from '../../components/view/ErrorView';
import SetMeta from '../../components/utils/SetMeta';
import { socialAnchorStyle } from '../../components/layout/SocialNav';
import HomeGraphic from '../../../../public/images/ui/home.svg';

interface Props {
	setMeta?: boolean;
	errorMessage?: string;
	errorStatus?: string;
}

export default function ErrorRoute(props: Props) {
	const { setMeta = true, errorMessage = 'Page Not Found', errorStatus = '404' } = props;

	const theme = useTheme();

	return (
		<>
			{setMeta ? <SetMeta nofollow noindex nosnippet title={'Error'} /> : null}
			<Main
				css={css`
					display: flex;
					flex-direction: column;
				`}
			>
				<NavLink
					css={[
						socialAnchorStyle(theme),
						css`
							display: block;
							margin: calc(var(--padding-h-main) / 2) var(--padding-h-main);
							font-size: 1.25em;
						`,
					]}
					title={'Return home'}
					to={'/'}
				>
					<HomeGraphic
						css={css`
							width: 1em;
							height: 1em;
						`}
					/>
				</NavLink>
				<div
					css={css`
						display: flex;
						flex-direction: column;
						flex-grow: 99;
						align-items: center;
						justify-content: center;
					`}
				>
					<ErrorView errorMessage={errorMessage} errorStatus={errorStatus} />
				</div>
			</Main>
		</>
	);
}

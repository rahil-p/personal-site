import { css } from '@emotion/react';

import SetMeta from '../../components/utils/SetMeta';
import Main from '../../components/view/Main';
import IntroBanner from './intro/IntroBanner';
import ProjectsBanner from './project/ProjectsBanner';
import Footer from '../../components/view/Footer';

export default function HomeRoute() {
	return (
		<>
			<SetMeta
				description={"I'm a software engineer. Let's build something meaningful together."}
				title={'Rahil Patel'}
			/>
			<Main>
				<IntroBanner />
				<ProjectsBanner />
			</Main>
			<Footer
				cssExtra={css`
					padding-bottom: clamp(2.25rem, calc(var(--padding-h-main) * 1.5), 6em);
				`}
			/>
		</>
	);
}

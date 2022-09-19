import { css } from '@emotion/react';

import SetMeta from '../../components/utils/SetMeta';
import Main from '../../components/view/Main';
import IntroContent from './intro/IntroContent';
import ProjectsContent from './project/ProjectsContent';
import Footer from '../../components/view/Footer';
import ResearchContent from './research/ResearchContent';
import GeneralContent from './general/GeneralContent';

export default function HomeRoute() {
	return (
		<>
			<SetMeta
				description={"Let's build something meaningful together."}
				title={'Rahil Patel • Software Engineer'}
			/>
			<Main
				cssExtra={css`
					& > :not(:first-child) {
						--vertical-margin: clamp(10rem, calc(var(--padding-h-main) * 4), 15rem);

						margin-top: var(--vertical-margin);
						margin-bottom: var(--vertical-margin);
					}

					& > :nth-child(2) {
						margin-top: clamp(6.25rem, calc(var(--padding-h-main) * 2.5), 9.375rem);
					}
				`}
			>
				<IntroContent />
				<ProjectsContent />
				<ResearchContent />
				<GeneralContent />
			</Main>
			<Footer
				cssExtra={css`
					padding-bottom: clamp(2.25rem, calc(var(--padding-h-main) * 1.5), 6em);
				`}
			/>
		</>
	);
}

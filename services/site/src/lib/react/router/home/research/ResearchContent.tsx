import { css } from '@emotion/react';

import ContentHeading from '../../../components/layout/ContentHeading';
import ResearchBlurb from './ResearchBlurb';

enum Affiliation {
	WEILL_OPHTHA = 'Department of Ophthalmology, Weill Cornell Medicine',
	WEILL_GASTRO = 'Department of Medicine, Division of Gastroenterology and Hepatology, Weill Cornell Medicine',
	WEILL_HPR = 'Department of Healthcare Policy and Research, Division of Biostatistics and Epidemiology, Weill Cornell Medicine',
	COLUMBIA_COLLEGE = 'Columbia College of Columbia University in the City of New York',
}

export default function ResearchContent() {
	return (
		<div
			css={css`
				padding: 0 var(--padding-h-main);
			`}
		>
			<ContentHeading>Research</ContentHeading>
			<ResearchBlurb
				article={{
					title: 'Comorbid hepatitis C does not modulate prevalence or severity of diabetic retinopathy',
					authors: [
						{ name: 'Koenig LR', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'Rosenblatt R', affiliation: Affiliation.WEILL_GASTRO },
						{ name: 'Patel RM', affiliation: Affiliation.COLUMBIA_COLLEGE },
						{ name: 'Wu Y', affiliation: Affiliation.WEILL_HPR },
						{ name: 'Papakostas TD', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'Orlin A', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'Chan RVP', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'Kiss S', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'D’Amico DJ', affiliation: Affiliation.WEILL_OPHTHA },
						{ name: 'Kumar S', affiliation: Affiliation.WEILL_GASTRO },
						{ name: 'Gupta MP', affiliation: Affiliation.WEILL_OPHTHA },
					],
					anchorProps: {
						href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6731984',
					},
				}}
				journal={{
					name: 'Clinical Ophthalmology',
					anchorProps: { href: 'https://www.dovepress.com/clinical-ophthalmology-journal' },
				}}
			/>
		</div>
	);
}

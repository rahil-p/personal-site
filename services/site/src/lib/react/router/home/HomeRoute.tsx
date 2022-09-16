import SetMeta from '../../components/utils/SetMeta';
import Main from '../../components/view/Main';
import IntroBanner from './intro/IntroBanner';
import ProjectsBanner from './project/ProjectsBanner';

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
		</>
	);
}

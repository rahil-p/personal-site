import { Outlet } from 'react-router-dom';

import View from '../components/view/View';

export default function Layout() {
	return (
		<View>
			<Outlet />
		</View>
	);
}

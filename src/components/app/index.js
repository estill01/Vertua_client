import React from 'react';
import '../../assets/fonts/Comfortaa-Regular.ttf'
import '../../assets/fonts/Comfortaa-Bold.ttf'
import { Sidebar } from 'semantic-ui-react'
import Page, { Metadata } from '../page'
import SideNav from '../menus/sidenav'

const App = () => (
	<>
		<Metadata/>
		<Sidebar.Pushable>
			<SideNav/>
			<Sidebar.Pusher>
				<Page/>
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	</>
)


export default App;

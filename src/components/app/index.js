import React from 'react';
import { Provider } from 'react-redux'
import store from '../../redux/store'
import '../../assets/fonts/Comfortaa-Regular.ttf'
import '../../assets/fonts/Comfortaa-Bold.ttf'
import { Sidebar } from 'semantic-ui-react'
import SideNav from '../menus/SideNav'
import { Page, Metadata } from '../page'

const App = () => (
	<React.StrictMode>
		<Provider store={store}>
			<Metadata/>
			<Sidebar.Pushable>
				<SideNav/>
				<Sidebar.Pusher>
					<Page/>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Provider>
	</React.StrictMode>
)


export default App;

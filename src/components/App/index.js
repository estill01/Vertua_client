import React from 'react';
import { Provider } from 'react-redux'
import '../../assets/fonts/Comfortaa-Regular.ttf'
import '../../assets/fonts/Comfortaa-Bold.ttf'
import { Sidebar } from 'semantic-ui-react'
import SideNav from '../menus/SideNav'
import { Page, Metadata } from '../page'
import { BrowserRouter } from 'react-router-dom'
import Superbar from '../Superbar'

// import store from '../../app/store'
// 
const App = ({ store }) => (
	<React.StrictMode>
		<Provider store={store}>
			<Metadata/>
			<BrowserRouter>
				<Superbar id='superbar' />
				<Page/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)


export default App;

				// <Sidebar.Pushable>
				// 	<SideNav/>
				// 	<Sidebar.Pusher>
				// 	</Sidebar.Pusher>
				// </Sidebar.Pushable>
        //

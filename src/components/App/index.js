import React from 'react';
import { Provider } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'
import SideNav from '../menus/SideNav'
import { Page, Metadata, Superbar } from '../page'
import { BrowserRouter } from 'react-router-dom'
// import '../../assets/fonts/comfortaa/Comfortaa-Regular.ttf'
// import '../../assets/fonts/comfortaa/Comfortaa-Bold.ttf'

const App = ({ store }) => {
	return (
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
}
export default App;

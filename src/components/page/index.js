import { Metadata, Dimmer, ScrollLock, Footer } from './utils'

import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from 'semantic-ui-react'
import SideNav from '../menus/sidenav'
import Superbar from '../superbar'

// import { Router } from '../../routing/Router'

const Page = () => (
	<>
		<BrowserRouter>
			<Sidebar.Pushable>
				<SideNav/>
				<Sidebar.Pusher>
					<Superbar/>
					<div>
						<h1>Vertua</h1>
						<h2>Projects</h2>
						<h2>Approaches</h2>
						<h2>Researchers</h2>
					</div>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</BrowserRouter>
	</>
)

export { Metadata, Dimmer, ScrollLock, Footer }
export default Page


					// <Router/>
					// <Footer/>
					// <ScrollLock/>
					// <Dimmer/>


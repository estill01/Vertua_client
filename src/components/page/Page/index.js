import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Dimmer } from 'semantic-ui-react'
import Router from '../../../router'
import Superbar from '../../Superbar'
import { Footer } from '../utils'

const Page = () => (
	<>
		<Superbar/>
		<div className='bg-secondary text-primary flex-1 p-4 min-h-screen'>
			<Router/>
		</div>
		<Footer/>
	</>
)

		// <Dimmer active={true}/>
		
			// <div className='flex flex-col min-h-screen'>
			// </div>
// <Dimmer/>
// <ScrollLock/>

export default Page

import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from '../../../router'
import Superbar from '../../Superbar'
import { Footer } from '../utils'

const Page = () => (
	<>
		<BrowserRouter>
			<div className='flex flex-col min-h-screen'>
				<Superbar/>
				<div className='bg-secondary text-primary flex-1'>
					<Router/>
				</div>
				<Footer/>
			</div>
		</BrowserRouter>
	</>
)
// <Dimmer/>
// <ScrollLock/>

export default Page

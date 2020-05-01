import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from '../../../router'
import Superbar from '../../Superbar'
import { Footer } from '../utils'

const Page = () => (
	<>
		<BrowserRouter>
			<Superbar/>
			<div className='bg-secondary text-primary'>
				<Router/>
			</div>
			<Footer/>
		</BrowserRouter>
	</>
)
// <Dimmer/>
// <ScrollLock/>

export default Page

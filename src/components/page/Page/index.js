import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Router from '../../../router'
import Superbar from '../../Superbar'
import { Footer } from '../utils'

const Page = () => (
	<>
			<div className='flex flex-col min-h-screen'>
				<Superbar/>
				<div className='bg-secondary text-primary flex-1 p-4'>
					<Router/>
				</div>
				<Footer/>
			</div>
	</>
)

// <Dimmer/>
// <ScrollLock/>

export default Page

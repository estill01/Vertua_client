import { Metadata, Dimmer, ScrollLock, Footer } from './utils'
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Superbar from '../superbar'
import Router from '../../router'

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
export { Metadata, Dimmer, ScrollLock, Footer }

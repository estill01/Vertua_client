import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import LogInForm from '../components/forms/LogInForm'

const HomePage = () => (
	<>
		<PageErrorBoundary>
			<FeaturedProjects/>
			<h3>Users Activity</h3>

		</PageErrorBoundary>
	</>
)

export default HomePage

const FeaturedProjects = () => (
  <>
		<h3>Featured Projects</h3>
		<div className='font-bold'>Organ Engineering</div>
		<div className='font-bold'>Cybernetics</div>
		<div className='font-bold'>Global Warming</div>
		<div className='font-bold'>Space Industrialization</div>
	</>
)

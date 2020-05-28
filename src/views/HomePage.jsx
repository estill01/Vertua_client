import React, { useState } from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import LogInForm from '../components/forms/LogInForm'
import NewProjectForm from '../components/forms/ProjectForm'

import { useStore } from 'react-redux'
import { firebase } from '../app'

const HomePage = () => {

	return (
		<>
			<PageErrorBoundary>
				<FeaturedProjects/>

				<NewProjectForm/>

				<hr/>
				<h3>Users Activity</h3>
				<UserList/>



			</PageErrorBoundary>
		</>
	)
}

export default HomePage


const UserList = () => {
	const [loading, setLoading ] = useState('idle')
	// TODO need to make 'users' collection / item when make account in order to show profiles.

	return (
		<>
		</>
	)
}


const FeaturedProjects = () => (
  <>
		<h3>Featured Projects</h3>
		<div className='font-bold'>Organ Engineering</div>
		<div className='font-bold'>Cybernetics</div>
		<div className='font-bold'>Global Warming</div>
		<div className='font-bold'>Space Industrialization</div>
	</>
)

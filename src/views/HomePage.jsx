import React, { useState, useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import LogInForm from '../components/forms/LogInForm'
import { ProjectForm } from '../components/forms/ProjectForm'
import { useStore } from 'react-redux'
import { firebase } from '../app'
import Card from '../components/utils/Card'

import SponsorResearchCard from '../components/cards/SponsorResearch'
import BuildTheFutureCard from '../components/cards/BuildTheFuture'
import RegisterCROCard from '../components/cards/RegisterCRO'

const HomePage = () => {
	useEffect(() => {
		const inputEl = document.getElementById('superbar_search_input')
		if (inputEl) { inputEl.value = '' }
	})

	return (
		<>
			<PageErrorBoundary>
				<BuildTheFutureCard/>
				<RegisterCROCard/>
				<SponsorResearchCard/>

				<FeaturedProjects/>


				<Card>
					<ProjectForm/>
				</Card>

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
		<h3 style={{marginTop: '0'}}>Featured Projects</h3>
		<div className='font-bold'>Organ Engineering</div>
		<div className='font-bold'>Cybernetics</div>
		<div className='font-bold'>Global Warming</div>
		<div className='font-bold'>Space Industrialization</div>
	</>
)

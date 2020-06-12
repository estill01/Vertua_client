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
import FeaturedProjectsCard from '../components/cards/FeaturedProjects'
import CommunityProductsCard from '../components/cards/CommunityProducts'

const HomePage = () => {
	useEffect(() => {
		const inputEl = document.getElementById('superbar_search_input')
		if (inputEl) { inputEl.value = '' }
	})

	return (
		<>
			<PageErrorBoundary>
				<BuildTheFutureCard/>
				<FeaturedProjectsCard/>
				<CommunityProductsCard className='my-6'/>
				<RegisterCROCard/>
				<SponsorResearchCard/>



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


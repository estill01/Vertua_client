import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import FeaturedUsersCard from '../components/cards/FeaturedUsers'

import { clearSuperbarSearch } from '../app/slices/SearchSlice.js'

const HomePage = () => {
	const dispatch = useDispatch()

	useEffect(() => { dispatch(clearSuperbarSearch()) })

	return (
		<>
			<PageErrorBoundary>
				<BuildTheFutureCard/>
				<FeaturedProjectsCard/>
				<CommunityProductsCard className='my-2'/>
				<SponsorResearchCard/>
				<FeaturedUsersCard/>
			</PageErrorBoundary>
		</>
	)
}
export default HomePage

// <RegisterCROCard/>
// <Card>
// 	<ProjectForm/>
// </Card>
//
// <hr/>
//
// <h3>Users Activity</h3>
// <UserList/>



const UserList = () => {
	const [loading, setLoading ] = useState('idle')
	// TODO need to make 'users' collection / item when make account in order to show profiles.
	return (
		<>
		</>
	)
}


import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PageErrorBoundary from './PageErrorBoundary'
import LogInForm from '../components/forms/LogInForm'
import { ProjectForm } from '../components/forms/ProjectForm'
import { useStore } from 'react-redux'
import { firebase } from '../app'
import Card from '../components/utils/Card'

import {
	BuildTheFutureCard,
	CommunityProductsCard,
	SponsorResearchCard,
	RegisterCROCard,
} from '../components/cards/specialty'
import * as Featured from '../components/cards/featured'
import RecentProjectsCard from '../components/cards/RecentProjects'

import { clearSuperbarSearch } from '../app/slices/SearchSlice.js'

const HomePage = () => {
	const dispatch = useDispatch()

	useEffect(() => { dispatch(clearSuperbarSearch()) })

	return (
		<>
			<PageErrorBoundary>
				<BuildTheFutureCard/>
				<Featured.ProjectsCard/>
				<RecentProjectsCard/>
				<CommunityProductsCard className='my-2'/>
				<SponsorResearchCard/>
				<Featured.UsersCard/>
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


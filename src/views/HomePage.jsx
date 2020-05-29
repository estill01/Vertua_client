import React, { useState, useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import LogInForm from '../components/forms/LogInForm'
import NewProjectForm from '../components/forms/ProjectForm'
import { useStore } from 'react-redux'
import { firebase } from '../app'

const HomePage = () => {

	useEffect(() => {
		const inputEl = document.getElementById('superbar_search_input')
		inputEl.value = ''
	})

	return (
		<>
			<PageErrorBoundary>
				<div className='h-20'/>

				<div>
					<h1></h1>
				</div>

				<FeaturedProjects/>
				<SponsorResearch/>
				<NewProjectForm/>

				<hr/>

				<h3>Users Activity</h3>
				<UserList/>

			</PageErrorBoundary>
		</>
	)
}

export default HomePage


const SponsorResearch = () => {

	return (
		<>
			<h3>Sponsor Research</h3>
			<ul>
				<li>- Commission one-off experiments of-interest.</li>
				<li>- Advance research agendas to further development of products or IP.</li>
				<li>- Back promising researchers, groups, or areas of study.</li>
				<li>- Participate in IP-share aragnements for potential future IP derived from work you sponsor.</li>
				<li>- Donate materials or resources to projects and causes you support.</li>
			</ul>
		</>
	)
}

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

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import PageErrorBoundary from './PageErrorBoundary'
import Card from '../components/utils/Card'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import { fetchProjectsForUser } from '../app/slices/UserSlice.js'
import { Loader } from 'semantic-ui-react'

// import { getProjectsForUser } from '../app/remote/firebase'
import { isNil } from 'lodash'

const UserPage = (props) => {
	const dispatch = useDispatch()
	const location = useLocation()
	let hasCurrent = useSelector(state => state.items.hasCurrent)
	let currentItem = useSelector(state => state.items.current)
	let projectList = []
	// let createdAt = useSelector(state => state.items.current.createdAt)
	
	useEffect(() => {
		console.log("[UserPage]") 
		
		// TODO Extract to utils(?)
		if (!hasCurrent) {
			(async function() {
				let path = location.pathname.split('/')
				await dispatch(fetchBySlug({type: path[1], slug: path[2]}))
				console.log("current item: ", currentItem)
			})()
		}
	})


	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>
					<Card className='mb-4'>
						<div className='flex flex-row'>
							{ currentItem && ( 
							<>
								<img src={currentItem.photoURL} className='h-16 w-16 rounded'/>
								<div className='flex flex-col ml-2'>
									<div className='text-3xl font-extrabold'>{currentItem.displayName}</div>
									<div>
									
										<div>Member Since:</div>
										<div className=''>{(() => {
											let date = new Date(currentItem.createdAt)
											return date.toString()
										})()}</div>
									</div>
								</div>
							</>
							)}
						</div>
					</Card>

					{ currentItem && (
						<UserProjectList data={currentItem}/>
					)}

				</div>
			</PageErrorBoundary>
		</>
	)
}
export default UserPage



const UserProjectList = (props) => {
	const dispatch = useDispatch()

	// Do each of these changing trigger a re-render?
	const isLoading = useSelector(state => state.user.isLoading )
	const projects = useSelector(state => state.user.projects )

	console.log("[ProjectList]")
	// console.log("props.data: ", props.data)


	// useEffect(() => {
	// 	(async function() {
	// 		if (!isNil(props.data.uid) && !isLoading) {
	// 			await dispatch(fetchProjects(props.data.uid))
	// 		}
	// 	})()
	// })

	async function loadData(e) {
		console.log("Loading data...")
		await dispatch(fetchProjectsForUser(props.data.uid))
		console.log("received projects: ", projects)
	}

	return (
		<div className='flex flex-col'>
			<div className='text-2xl font-bold'>Projects</div>
			{isLoading && (<Loader active content='Loading'/>)}
			{!isLoading && (
				<div className='flex flex-col'>
					{ projects.map((project, i) => {
						return <ProjectListItem data={project} key={i}/>
					})}
				</div>
			)}
			<button onClick={loadData}>load data</button>

		</div>
	)
}

const ProjectListItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		history.push(`/${props.data.urlSlug}`)
	}

	return (
		<div 
		className='p-4 flex flex-col cursor-pointer hover:text-blue-500 active:text-blue-600 border border-transparent hover:border-blue-400 rounded mb-2'
		onClick={handleClick}
		>
			<div className='text-xl font-bold'>{props.data.name}</div>
			<div>{new Date(props.data.createdAt).toString()}</div>
		</div>
	)
}



			// (async function() {
			// 	let path = location.pathname.split('/')
			// 	await dispatch(fetchBySlug({type: path[1], slug: path[2]}))
			// 	console.log("current item: ", currentItem)
			// })()


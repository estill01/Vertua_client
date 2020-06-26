import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { isNil } from 'lodash'
import Card from '../utils/Card'
import { fetchBySlug, setCurrentItem } from '../../app/slices/ItemsSlice.js'
import { fetchProjectsForUser } from '../../app/slices/UserSlice.js'


export const ItemList = (props) => {
	const dispatch = useDispatch()
	const isLoading = useSelector(state => state.user.isLoading )
	const projects = useSelector(state => state.user.projects )

	console.log("[ProjectList]")

	useEffect(() => {
		(async function() {
			// TODO Fix; this will infinite loop if user has 0 projects...
			if (!isNil(props.data.uid) && !isLoading && projects.length === 0) {
				await dispatch(fetchProjectsForUser(props.data.uid))
			}
		})()
	})

	async function loadData(e) {
		console.log("Loading data...")
		await dispatch(fetchProjectsForUser(props.data.uid))
		console.log("received projects: ", projects)
	}

	return (
		<div className='flex flex-col p'>

			<div 
			className='border border-gray-300 rounded p-2 mb-2'
			>

				{isLoading && (<Loader active content='Loading'/>)}

				{!isLoading && projects.length > 0 && (
					<div className='flex flex-col'>
						{ projects.map((project, i) => {
							return <ListItem data={project} key={i}/>
						})}
					</div>
				)}

			</div>


			<button 
			onClick={loadData}
			className='text-gray-600 border border-gray-400 rounded p-2 pointer-cursor select-none text-lg font-bold hover:gb-gray-400 active:bg-gray-500'
			style={{ 
				fontVariant: 'small-caps',
				backgroundImage: 'linear-gradient(to top, #cbd5e0, #e2e8f0)',
			}}
			>
				load data
			</button>
		</div>
	)
}
// className='bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-600 border border-gray-400 rounded p-2 pointer-cursor select-none text-lg font-bold'

const ListItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		// TODO Wrap this pattern up in a page action/reducer
		history.push(props.data.urlSlug)
		dispatch(setCurrentItem(props.data))
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


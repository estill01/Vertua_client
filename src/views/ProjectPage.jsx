import React, { useEffect } from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchBySlug } from '../app/remote/firebase'

const ProjectPage = () => {
	const store = useStore()
	const items = store.getState().items
	const location = useLocation()
	let currentItem = null
	// const image = require(`${item.img}`) // right; this will be a url or otherwise an image sent down the wire.
  const image = require('./images_tmp/cybernetics.jpg')	 // Nb. TMP

	// ***** TODO Finish Implementation *****
	useEffect(() => {
		console.log("[ProjectPage]")
		console.log("hasCurrent?: ", items.hasCurrent)
	 	console.log("current item: ", items.current)

		async function fetchData() {
			let slug = location.pathname.slice(1, location.pathname.length)
			currentItem = await fetchBySlug('projects', slug)
		}

		if (!items.hasCurrent) {
			console.log("location: ", location)
			// TODO should call via redux action
			console.log("fetching by slug...")
			fetchData()
			console.log("item: ", currentItem)
		}


	})




	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>

					<div className='flex flex-row p-4 rounded-md shadow border border-gray-400'>
						<div className='w-56 h-56 rounded-md'>
							<img src={image} className='rounded-md h-full w-full'/>
						</div>
						<div className='flex flex-col p-4'>
							<div className='text-4xl font-extrabold'>{items.current.name}</div>
							<div className='flex-1'/>
						</div>
					</div>

				</div>
			</PageErrorBoundary>
		</>
	)
}

export default ProjectPage 

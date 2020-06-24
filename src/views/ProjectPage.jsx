import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
//import { fetchBySlug } from '../app/remote/firebase'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import PageErrorBoundary from './PageErrorBoundary'

const ProjectPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	let hasCurrent = useSelector(state => state.items.hasCurrent) 
	let currentItem = useSelector(state => state.items.current) 

	// const image = require(`${item.img}`) // right; this will be a url or otherwise an image sent down the wire.
  const image = require('./images_tmp/cybernetics.jpg')	 // Nb. TMP

	useEffect(() => {
		console.log("[ProjectPage]")
		console.log("hasCurrent?: ", hasCurrent)
	 	console.log("current item: ", currentItem)

		if (!hasCurrent) {
			(async function() {
				// let slug = location.pathname.slice(1, location.pathname.length)
				let path = location.pathname.split('/')
				await dispatch(fetchBySlug({type: path[1], slug: path[2]}))
	 			console.log("current item: ", currentItem)
			})()
		}

		return () => {}
	})




	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>

						<div className='flex flex-col'>
						{currentItem && (
							<div className='text-4xl font-extrabold leading-snug'>{currentItem.name}</div>
						)}
						</div>

					{currentItem.creator && (
						<div className='flex-1 mt-4'>
							<div>Created by</div>
							<div className='flex flex-row'>
								<img src={currentItem.creator.photoURL} className='h-10 w-10 rounded'/>
								<div className='ml-2'>{currentItem.creator.displayName}</div>
							</div>
						</div>
					)}

					<div className='mt-4'>
						<div className='text-2xl font-extrabold'>
							Approaches
						</div>
					</div>

				</div>
			</PageErrorBoundary>
		</>
	)
}

export default ProjectPage 

					// <div className='flex flex-row p-4 rounded-md shadow border border-gray-400'>
					// </div>

				// 	<div className='mt-4'>
				// 		<img src={currentItem.creator.photoURL}/>
				// 		<div>
				// 			{currentItem.creator.displayName}
				// 		</div>
				// 	</div>
				// </div>
        //

import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import PageErrorBoundary from './PageErrorBoundary'
import { ListItemMini } from '../components/items'
import { UserItemMini } from '../components/items/user'
import { fetchCurrentItem } from '../app/utils'

const ProjectPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	let hasCurrent = useSelector(state => state.items.hasCurrent) 
	let currentItem = useSelector(state => state.items.current) 

	// const image = require(`${item.img}`) // right; this will be a url or otherwise an image sent down the wire.
  const image = require('./images_tmp/cybernetics.jpg')	 // Nb. TMP

	// ====================================
	//   ProjectPage: LOAD CURRENT ITEM
	// ====================================
	useEffect(() => {
		console.log("[ProjectPage]")
		fetchCurrentItem()
	})


	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>

						<div className='flex flex-col'>
						{currentItem && (
							<div className='text-2xl font-bold leading-snug'>{currentItem.name}</div>
						)}
						</div>

					{currentItem.creator && (
						<UserItemMini data={currentItem.creator} className='mt-4'/>
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

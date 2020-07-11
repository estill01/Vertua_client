import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import PageErrorBoundary from './PageErrorBoundary'
import { ListItemMini, ItemMadeBy } from '../components/items'
import { UserItemMini } from '../components/items/user'
import { fetchCurrentItem, TYPES } from '../app/utils'
import { Card, icon } from '../components/utils'
import { isNil } from 'lodash'


const ProjectPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	let hasCurrent = useSelector(state => state.items.hasCurrent) 
	let currentItem = useSelector(state => state.items.current) 


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

					<Card>
						{currentItem && (
						<div className='flex flex-row items-center'>
							{ icon(TYPES.projects, 'mr-2 h-6 w-6 p-1 border border-gray-500 rounded-md') }
							<div className='text-2xl font-bold leading-snug'>{currentItem.name}</div>
						</div>
						)}
						
						<hr className='my-2'/>


						{ !isNil(currentItem.creator) && (
							<>
								<div className='flex flex-row'>
								
								<div className='flex-1 mr-2'>
									<div className='detail-header mb-1'>Created By</div>
									<ItemMadeBy data={currentItem.creator}/>
								</div>

								<div className='flex-1 mr-2'>
									<div className='detail-header mb-1'>Created At</div>
									<div>{ new Date(currentItem.createdAt).toString() }</div>
								</div>

								</div>
							</>
						)}
					</Card>

					<Card className='mt-4'>
						<div className='section-header'>
							Approaches
						</div>
					</Card>

					<Card className='mt-4'>
						<div className='section-header'>
							Enables
						</div>
					</Card>

					<Card className='mt-4'>
						<div className='section-header'>
							Requires
						</div>
					</Card>



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

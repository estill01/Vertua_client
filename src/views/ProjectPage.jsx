import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import PageErrorBoundary from './PageErrorBoundary'
import { ListItemMini, ListItemMadeBy } from '../components/items'
import { UserItemMini } from '../components/items/user'
import { fetchCurrentItem } from '../app/utils'
import { Card } from '../components/utils'
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
						<>
							<div className='text-2xl font-bold leading-snug'>{currentItem.name}</div>
						</>
						)}
						
						<hr className='my-2'/>

						<div className='section-header mb-1'>Created By</div>

						{ !isNil(currentItem.creator) && (
							<>
								<UserItemMini data={currentItem.creator}/>
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

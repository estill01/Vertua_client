import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import PageErrorBoundary from './PageErrorBoundary'
import Card from '../components/utils/Card'
import { fetchBySlug, setCurrentItem } from '../app/slices/ItemsSlice.js'
import { fetchProjectsForUser } from '../app/slices/UserSlice.js'
import { Loader } from 'semantic-ui-react'
import { ItemList } from '../components/items/ItemList.jsx'
import { UserAvatar } from '../components/utils/UserAvatar'

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

		// TODO Extract to a utility function.
		// - check hasCurrent
			// - if yes, check item against url 
				//  - if match, do nothing
				//  - if not match, fetch item from url
			// - if no, fetch item from url
		
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
								<div className='h-24 w-24 border border-gray-400 rounded p-px bg-white'>
									<UserAvatar data={currentItem} className='rounded-sm'/>
								</div>

								<div className='flex flex-col ml-2'>

									{ currentItem && currentItem.displayName === '' && (
									<>
										<div>Anonymous User:</div>
										<div className='text-xl font-bold'>
											{currentItem.uid}
										</div>
									</>
									)}

									{ currentItem && currentItem.displayName != '' && (
									<>
										<div>Name:</div>
										<div className='text-xl font-bold'>
											{currentItem.displayName}
										</div>
									</>
									)}

									<div className='mt-2'>
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
						<>
							<div className='text-2xl font-bold mb-2'>Projects</div>
							<div className='border border-gray-400 rounded p-2'>
								<ItemList data={currentItem}/>
							</div>
						</>
					)}

				</div>
			</PageErrorBoundary>
		</>
	)
}
export default UserPage

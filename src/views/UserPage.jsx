import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import PageErrorBoundary from './PageErrorBoundary'
import Card from '../components/utils/Card'
import { fetchBySlug, setCurrentItem } from '../app/slices/ItemsSlice.js'
import { fetchProjectsForUser } from '../app/slices/UserSlice.js'
import { Loader } from 'semantic-ui-react'
import { ItemList } from '../components/items'
import { UserAvatar } from '../components/utils/UserAvatar'
import { fetchCurrentItem } from '../app/utils'

// import { getProjectsForUser } from '../app/remote/firebase'
import { isNil } from 'lodash'

const UserPage = (props) => {
	const dispatch = useDispatch()
	let currentItem = useSelector(state => state.items.current)
	let projectList = []
	
	// ==================================
	//   UserPage: LOAD CURRENT ITEM
	// ==================================
	useEffect(() => {
		console.log("[UserPage]")
		fetchCurrentItem()
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

									{ currentItem && (currentItem.displayName === '' || isNil(currentItem.displayName)) && (
									<>
										<div>Anonymous User:</div>
										<div className='text-xl font-bold'>
											{currentItem.uid}
										</div>
									</>
									)}

									{ currentItem && (currentItem.displayName !== '' && !isNil(currentItem.displayName)) && (
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






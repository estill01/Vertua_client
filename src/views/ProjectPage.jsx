import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchBySlug } from '../app/slices/ItemsSlice.js'
import PageErrorBoundary from './PageErrorBoundary'
import { ListItemMini, ItemMadeBy } from '../components/items'
import { UserItemMini } from '../components/items/user'
import { fetchCurrentItem, TYPES } from '../app/utils'
import { Card, icon, TypeIcon } from '../components/utils'
import { isNil } from 'lodash'
import Linkify from 'react-linkify'

import { Icon, Label, Menu, Tab } from 'semantic-ui-react'


const ProjectPage = () => {
	const location = useLocation()
	const dispatch = useDispatch()

	const hasCurrent = useSelector(state => state.items.hasCurrent) 
	const currentItem = useSelector(state => state.items.current) 


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
				<div className='p-2'>

					<Card>
						{currentItem && (
						<div className='flex flex-col'>
							<div className='text-gray-500 text-sm'>
								{ new Date(currentItem.createdAt).toString() }
							</div>
							<div className='text-3xl font-bold leading-snug'>{currentItem.name}</div>
							<hr className='my-2'/>

							{ !isNil(currentItem.creator) && (
							<ItemMadeBy data={currentItem.creator}/>
							)}

						</div>
						)}
					</Card>



					<div className='mt-4'>
						<TabArea/>
						<DiscussionArea/>
					</div>


				</div>
			</PageErrorBoundary>
		</>
	)
}
export default ProjectPage 

const TabArea = (props) => {
	const panes = [
		{
			menuItem: (
				<Menu.Item
				name='approaches'
				color='orange'
				>
					<Icon 
					name='sitemap' 
					size='large'
					className='text-gray-800'
					/>
					<span className='text-gray-800'>Approaches</span>
					<Label>0</Label>
				</Menu.Item>
			),
			render: () => <Tab.Pane>Approaches</Tab.Pane>,
		},
		{
			menuItem: (
				<Menu.Item 
				name='requires'
				color='orange'
				>
					<Icon 
					name='sign in alternate' 
					size='large'
					className='text-gray-800'
					/>
					<span className='text-gray-800'>Requires</span>
					<Label>6</Label>
				</Menu.Item>
			),
			render: () => <Tab.Pane>Requires</Tab.Pane>,
		},
		{
			menuItem: (
				<Menu.Item 
				name='enables'
				color='orange'
				>
					<Icon 
					name='sign out alternate' 
					size='large'
					className='text-gray-800'
					/>
					<span className='text-gray-800'>Enables</span>
					<Label>27</Label>
				</Menu.Item>
			),
			render: () => <Tab.Pane>Enables</Tab.Pane>,
		},
	]

	return (
		<Tab panes={panes} menu={{ secondary: true, pointing: true }} />
	)
}

const DiscussionArea = (props) => {
	const currentItem = useSelector(state => state.items.current) 

  return (
		<div className='mt-4'>

			<div className='flex flex-row'>
				<Icon name='comments outline' size='large'/>
				<div className='section-header ml-1'>
					Discussion
				</div>
		
			</div>

			<div>

				{ !isNil(currentItem.creator) && (
				<div>
					<div className='mb-1 p-1 border border-gray-400 rounded-md'>
						<Linkify>{currentItem.description}</Linkify>
					</div>
					<ItemMadeBy data={currentItem.creator}/>
				</div>
				)}

				<div>
					<input placeholder='comment'/>
				</div>

			</div>

		</div>
	)
}

const DetailItem = (props) => {
	return (
		<>
			<div className={`flex flex-col ${props.className}`}>
				<div className='detail-header mb-1'>{props.header}:</div>
				<div>
					<div className='float-left'>
						{props.children}
					</div>
				</div>
			</div>
		</>
	)
}

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

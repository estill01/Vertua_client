import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSearch, clearSuperBarSearch } from '../../app/slices/SearchSlice'
import { nukeOverlays } from '../../app/slices/PageSlice'
import { setCurrentItem, clearCurrentItem } from '../../app/slices/ItemsSlice'
import { isNil, startCase } from 'lodash'
import { handleItemClick } from '../../app/utils'
import { UserAvatar, AvatarFrame } from '../utils/UserAvatar'

import { ReactComponent as ProjectIcon } from './images/hexagon.svg'
import { ReactComponent as UsersIcon } from './images/user.svg'
import { ReactComponent as GroupsIcon } from './images/venn-diagram.svg'
import { ReactComponent as ExperimentsIcon } from './images/beaker.svg'
import { ReactComponent as ToolsIcon } from './images/wrench.svg'
import { ReactComponent as ServicesIcon } from './images/truck.svg'

const ICONS = {
	projects: <ProjectIcon className='h-6 w-6 mx-auto'/>,
	users: <UsersIcon className='h-6 w-6 mx-auto'/>,
	groups: <GroupsIcon className='h-6 w-6 mx-auto'/>,
	experiments: <ExperimentsIcon className='h-6 w-6 mx-auto'/>,
	tools: <ToolsIcon className='h-6 w-6 mx-auto'/>,
	services: <ServicesIcon className='h-6 w-6 mx-auto'/>,
}


// ==========================================
// 	Search Result Page: Structural Elements
// ==========================================
export const SearchResultsSection = (props) => {
	return (
		<div className={props.className}>
			<SectionHeader type={props.type}/>

			<>
			{ !isNil(props.results[props.type]) && (props.results[props.type].length !== 0 ) && 
				props.results[props.type].map((result, i) => {
					return ( 
						<ListItem key={i} data={result} type={props.type} className='mb-4'/>
					)
				})
			}
			</>

			{ (isNil(props.results[props.type]) || props.results[props.type].length === 0) && (
				<div className='italic mb-4 px-2'>no {props.type} found</div>
			)}

		</div>
	)
}

const SectionHeader = (props) => {
	let type = startCase(props.type)

	return (
		<div 
		className='flex flex-row border-gray-300 mb-2 rounded-sm bg-white items-center pb-1 border-b' 
		>
			<div 
			className='w-6 h-6 flex items-center rounded'
			>
			  { ICONS[props.type] }
			</div>

			<div 
			className='font-semibold text-gray-700 text-lg leading-normal px-1 py-1px' 
			style={{
				marginRop: '-0.25rem',
			}}
			>
				{type}
			</div>
		</div>
	)
}

// ------------------------------------------------------------------

const ListItem = (props) => {
	const history = useHistory()
	const refItem = React.createRef()
	const refAvatar = React.createRef()
	const refName = React.createRef()
	const refDetails = React.createRef()
	//	const dispatch = useDispatch()

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}
	function toggleStylesOn() { refItem.current.classList.add('border-blue-500') }
	function toggleStylesOff() { refItem.current.classList.remove('border-blue-500') }
	function toggleTextStylesOn() { refName.current.classList.add('text-blue-600') }
	function toggleTextStylesOff() { refName.current.classList.remove('text-blue-600') }

	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer border border-gray-400 rounded p-2 shadow-sm ${props.className}`}
			onClick={handleClick}
			onMouseEnter={toggleStylesOn}
			onMouseLeave={toggleStylesOff}
			ref={refItem}
			>
				<ListItemAvatar ref={refAvatar} type={props.type} data={props.data}/>
				<div className='flex flex-col truncate'>
					<ListItemName 
					ref={refName} 
					type={props.type} 
					data={props.data}
					/>

					<div className='flex flex-row truncate'>
						<ListItemDetails 
						ref={refDetails} 
						type={props.type} 
						data={props.data} 
						toggleStylesOn={toggleTextStylesOn}
						toggleStylesOff={toggleTextStylesOff}
						/>
					</div>

				</div>
			</div>
		</>
	)
}


const ListItemAvatar = React.forwardRef((props, ref) => {
	const hasAvatar = !isNil(props.data.photoURL) && props.data.photoURL !== ''

	return (
		<div 
		className='flex mr-2'
		style={{ 
			width: '3.5rem',
			minWidth: '3.5rem',
			maxWidth: '3.5rem',
			height: '3.5rem',
			minHeight: '3.5rem',
			maxHeight: '3.5rem',
		}}
		>
			<div 
			className='flex-1 rounded border border-gray-400'
			style={{
				backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))'
			}}
			ref={ref}
			>
				<div className='w-full h-full rounded flex items-center'>
				 	{ hasAvatar && (<img src={props.data.photoURL} className='w-full h-full rounded'/>) }
			  	{ !hasAvatar && ICONS[props.type] }
				</div>
			</div>
		</div>
	)
})

const ListItemName = React.forwardRef((props, ref) => {
	return (
		<div 
		className='flex-1 font-semibold text-xl truncate text-blue-600'
		style={{
			minWidth: '0%',
		}}
		onMouseEnter={props.onMouseEnter}
		onMouseLeave={props.onMouseLeave}
		ref={ref}
		>
			{props.type !== 'users' && props.data.name}
			{props.type === 'users' && props.data.displayName}
		</div>
	)
})


const ListItemDetails = React.forwardRef((props, ref) => {

	return (
		<>
			{ props.type === 'users' && <ItemStats data={props.data}/> }
			{ props.type !== 'users' && (
			<ItemCreator 
			data={props.data} 
			toggleStylesOn={props.toggleStylesOn}
			toggleStylesOff={props.toggleStylesOff}
			/> 
			)}
			
		</>
	)
})

// 					<div className='flex flex-row'>
// 						<_ItemCreator
// 						creator={props.data.creator}
// 						toggleParentTextStylesOn={toggleTextStylesOn}
// 						toggleParentTextStylesOff={toggleTextStylesOff}
// 						/>
// 					</div>


const ItemCreator = (props) => {
	const refName = React.createRef()
	const refAvatar = React.createRef()
	const history = useHistory()

	// TODO add a safty existence check for props.data.creator

	function handleMouseEnter(e) { 
		refName.current.classList.add('text-blue-600')
		// props.refName.current.classList.remove('text-blue-600')
		props.toggleStylesOff()
	}
	function handleMouseLeave(e) {
		refName.current.classList.remove('text-blue-600')
		props.toggleStylesOn()
	}
	function handleClick(e) {
		e.stopPropagation()
		handleItemClick(props.data.creator)
		history.push(props.data.creator.urlSlug)
	}

	return (
		<div>
			<div 
			className='flex flex-row items-center truncate'
			ref={refName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			>
				<div ref={refAvatar} className='border border-transparent rounded-sm'>
					<UserAvatar data={props.data.creator} className='rounded-full h-5 w-5 flex-none'/> 
				</div>
				<div className='ml-1'>{props.data.creator.displayName}</div>
			</div>
		</div>
	)
}

const ItemStats = (props) => {
	let date = new Date(props.data.createdAt)
	return (
		<div className='truncate'>
			Joined: { date.toString() }
		</div>
	)
}


// -------------------------------------------------------------------

// const _SearchResultItem = (props) => {
// 	const history = useHistory()
// 	const dispatch = useDispatch()
// 	const refitem = React.createRef()
// 	const refname = React.createRef()
// 	const refavatar = React.createRef()
//
// 	let creator = null
// 	if (!isNil(props.data.creator)) {
// 		if (!isNil(props.data.creator.displayName)) {
// 			creator = "added by: " + props.data.creator.displayName
// 		}
// 	}
//
// 	function handleClick(e) {
// 		handleItemClick(props.data)
// 		history.push(props.data.urlSlug)
// 	}
// 	function toggleStylesOn() { refitem.current.classList.add('border-blue-500') }
// 	function toggleStylesOff() { refitem.current.classList.remove('border-blue-500') }
// 	function toggleTextStylesOn() { refname.current.classList.add('text-blue-600') }
// 	function toggleTextStylesOff() { refname.current.classList.remove('text-blue-600') }
//
// 	return (
// 		<>
// 			<div 
// 			className={`flex flex-row cursor-pointer border border-gray-400 rounded p-2 shadow-sm ${props.className}`}
// 			onClick={handleClick}
// 			onMouseEnter={toggleStylesOn}
// 			onMouseLeave={toggleStylesOff}
// 			ref={refitem}
// 			>
// 				<div 
// 				className='flex mr-2'
// 				style={{ 
// 					width: '3.5rem',
// 					minWidth: '3.5rem',
// 				}}
// 				>
// 					<_ItemAvatar 
// 					data={props.data}
// 					ref={refavatar}
// 					/>
// 				</div>
//
// 				<div 
// 				className='flex-1 flex flex-col overflow-hidden'
// 				style={{ height: '3.5rem' }}
// 				>
// 					<div className='flex flex-1'>
// 						<_ItemDetails 
// 						data={props.data}
// 						ref={refname}
// 						/>
// 					</div>
//
// 					<div className='flex flex-row'>
// 						<_ItemCreator
// 						creator={props.data.creator}
// 						toggleParentTextStylesOn={toggleTextStylesOn}
// 						toggleParentTextStylesOff={toggleTextStylesOff}
// 						/>
// 					</div>
// 				</div>
//
//
// 			</div>
// 		</>
// 	)
// }
//
//



						// <_ItemCreator
						// creator={props.data.creator}
						// toggleParentTextStylesOn={toggleTextStylesOn}
						// toggleParentTextStylesOff={toggleTextStylesOff}
						// />


// const _ItemContent = (props) => {
// 	return (
// 		<>
// 			<div 
// 			className='flex-1 flex flex-col overflow-hidden'
// 			style={{ height: '3.5rem' }}
// 			>
// 				<div className='flex flex-1'>
// 					<_ItemDetails 
// 					data={props.data}
// 					ref={refname}
// 					/>
// 				</div>
//
// 				<div className='flex flex-row'>
// 					<_ItemCreator
// 					creator={props.data.creator}
// 					toggleParentTextStylesOn={toggleTextStylesOn}
// 					toggleParentTextStylesOff={toggleTextStylesOff}
// 					/>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

		// <_ItemCreator
		// creator={props.data.creator}
		// toggleParentTextStylesOn={toggleTextStylesOn}
		// toggleParentTextStylesOff={toggleTextStylesOff}
		// />


// const _UserSearchResultItem = (props) => {
// 	const history = useHistory()
// 	const dispatch = useDispatch()
// 	let name = props.data.displayName 
//
// 	function handleClick(e) {
// 		handleItemClick(props.data)
// 		history.push(props.data.urlSlug)
// 	}
//
// 	return (
// 		<>
// 			<div 
// 			className={`flex flex-row cursor-pointer ${props.className}`}
// 			onClick={handleClick}
// 			>
// 				<div 
// 				className='w-16 h-16 rounded border border-blue-400 mr-2'
// 				style={{
// 					background: 'linear-gradient(to top right, blue, teal, teal)'
// 				}}
// 				>
// 					<img src={props.data.photoURL} className='w-full h-full rounded'/>
// 				</div>
// 				<div className='flex flex-col'>
// 					<div className='text-lg font-bold'>{name}</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }







// ==========================================
// 	SEARCH DROP-DOWN
// ==========================================
export const MiniSearchResultItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	return (
		<>
			<div className='h-16 cursor-pointer rounded p-2 shadow flex flex-row' onClick={() => handleClick()}>
				{ props.type === 'user' && (<MiniSearchItemUser data={props.data}/> )}
				{ props.type !== 'user' && (<MiniSearchItemProject data={props.data}/> )}
			</div>
		</>
	)
}

const MiniSearchItemUser = (props) => (
	<>
		<img src={props.data.photoURL} className='w-12 h-12 rounded' />
		<div className='ml-2'>{props.data.displayName}</div>
	</>
)
const MiniSearchItemProject = (props) => (
	<>
		<img src={props.data.photoURL} className='w-12 h-12 rounded' />
		<div className='ml-2'>{props.data.name}</div>
	</>
)



// export const SearchResultItem = (props) => {
// 	return (
// 		<>
// 			{ props.type !== 'users' && (<ListItem data={props.data} className={props.className}/>) }
// 			{ props.type === 'users' && (<UserListItem data={props.data} className={props.className}/>) }
// 		</>
// 	)
// }



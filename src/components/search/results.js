import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSearch, clearSuperBarSearch } from '../../app/slices/SearchSlice'
import { nukeOverlays } from '../../app/slices/PageSlice'
import { setCurrentItem, clearCurrentItem } from '../../app/slices/ItemsSlice'
import { isNil } from 'lodash'
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
// 	search results page
// ==========================================
export const SearchResultsSection = (props) => {
	return (
		<div className={props.className}>
			<SectionHeader type={props.type}/>

			<>
			{ !isNil(props.results[props.type]) && (props.results[props.type].length !== 0 ) && 
				props.results[props.type].map((result, i) => {
					return ( 
						<SearchResultItem key={i} data={result} type={props.type} className='mb-4'/>
					)
				})
			}
			</>

			{ (isNil(props.results[props.type]) || props.results[props.type].length === 0) && (
				<div className='italic mb-4'>no {props.type} found</div>
			)}

		</div>
	)
}

const SectionHeader = (props) => {
	return (
		<div 
		className='flex flex-row border-gray-300 mb-4 rounded-sm bg-white items-center pb-1 border-b' 
		>
			<div 
			className='w-8 h-8 flex items-center rounded'
					>
				{ ICONS[props.type] }
			</div>

			<div 
			className='ml-1 font-semibold text-gray-700 text-2xl leading-normal px-1 py-1px' 
			style={{
				fontvariant: 'small-caps',
				margintop: '-0.25rem',
			}}
			>
				{props.type}
			</div>
		</div>
	)
}


export const SearchResultItem = (props) => {
	return (
		<>
			{ props.type === 'users' && (<_UserSearchResultItem data={props.data} className={props.className}/>) }
			{ props.type !== 'users' && (<_SearchResultItem data={props.data} className={props.className}/>) }
		</>
	)
}

const _SearchResultItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const refitem = React.createRef()
	const refname = React.createRef()
	const refavatar = React.createRef()

	let creator = null
	if (!isNil(props.data.creator)) {
		if (!isNil(props.data.creator.displayName)) {
			creator = "added by: " + props.data.creator.displayName
		}
	}

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}
	function toggleStylesOn() {
		refitem.current.classList.add('border-blue-500')
		refname.current.classList.add('text-blue-600')
		// refavatar.current.classList.add('border-blue-600')
	}
	function toggleStylesOff() {
		refitem.current.classList.remove('border-blue-500')
		refname.current.classList.remove('text-blue-600')
		// refavatar.current.classList.remove('border-blue-600')
	}
	function toggleTextStylesOn() {
		// refitem.current.classList.add('border-blue-500')
		refname.current.classList.add('text-blue-600')
		// refavatar.current.classList.add('border-blue-600')
	}
	function toggleTextStylesOff() {
		// refitem.current.classList.remove('border-blue-500')
		refname.current.classList.remove('text-blue-600')
		// refavatar.current.classList.remove('border-blue-600')
	}


	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer border border-gray-400 rounded p-2 shadow-sm ${props.className}`}
			onClick={handleClick}
			onMouseEnter={toggleStylesOn}
			onMouseLeave={toggleStylesOff}
			ref={refitem}
			>
				<div 
				className='flex mr-2'
				style={{ width: '3.5rem' }}
				>
					<_ItemAvatar 
					data={props.data}
					ref={refavatar}
					/>
				</div>
				<div 
				className='flex-1 flex flex-col'
				style={{ height: '3.5rem' }}
				>
					<_ItemDetails 
					data={props.data}
					ref={refname}
					/>
					<div className='flex flex-row'>
						<_ItemCreator
						creator={props.data.creator}
						toggleParentTextStylesOn={toggleTextStylesOn}
						toggleParentTextStylesOff={toggleTextStylesOff}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

// todo make project icon actually show the projct avatar
const _ItemAvatar = React.forwardRef((props, ref) => {
	return (
		<div 
		className='flex-1 rounded border border-gray-400 p-2'
		style={{
			backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))'
		}}
		ref={ref}
		>
			<ProjectIcon className='w-full h-full rounded'/>
		</div>
	)
})
		// onMouseEnter={props.onMouseEnter}
		// onMouseLeave={props.onMouseLeave}


const _ItemDetails = React.forwardRef((props, ref) => {
	return (
		<div 
 		className='font-medium flex-1'
		style={{
			fontSize: 'calc(1rem + 0.8vw)'
		}}
		onMouseEnter={props.onMouseEnter}
		onMouseLeave={props.onMouseLeave}
		ref={ref}
		>
			{props.data.name}
		</div>
	)
})


const _ItemCreator = (props) => {
	const refName = React.createRef()
	const refAvatar = React.createRef()
	const history = useHistory()

	function handleMouseEnter(e) { 
		refName.current.classList.add('text-blue-500')
		// refAvatar.current.classList.add('border-blue-500')

		props.toggleParentTextStylesOff()

	}
	function handleMouseLeave(e) {
		refName.current.classList.remove('text-blue-500')
		// refAvatar.current.classList.remove('border-blue-500')
		props.toggleParentTextStylesOn()
	}
	function handleClick(e) {
		e.stopPropagation()
		handleItemClick(props.creator)
		history.push(props.creator.urlSlug)
	}

	return (
		<div>
			<div 
			className='flex flex-row items-center'
			ref={refName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			>
				<div ref={refAvatar} className='border border-transparent rounded-sm'>
					<UserAvatar data={props.creator} className='rounded-full h-5 w-5 flex-none'/> 
				</div>
				<div className='ml-1'>{props.creator.displayName}</div>
			</div>
		</div>
	)
}

const _UserSearchResultItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()
	let name = props.data.displayName 

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer ${props.className}`}
			onClick={handleClick}
			>
				<div 
				className='w-16 h-16 rounded border border-blue-400 mr-2'
				style={{
					background: 'linear-gradient(to top right, blue, teal, teal)'
				}}
				>
					<img src={props.data.photoURL} className='w-full h-full rounded'/>
				</div>
				<div className='flex flex-col'>
					<div className='text-lg font-bold'>{name}</div>
				</div>
			</div>
		</>
	)
}



					// <img src={props.data.photoURL} className='w-full h-full rounded'/>


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





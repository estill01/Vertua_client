import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSearch, clearSuperbarSearch } from '../../app/slices/SearchSlice'
import { nukeOverlays } from '../../app/slices/PageSlice'
import { setCurrentItem, clearCurrentItem } from '../../app/slices/ItemsSlice.js'
import { isNil } from 'lodash'
import { handleItemClick } from '../../app/utils'
import { UserAvatar, AvatarFrame } from '../utils/UserAvatar'

// import { ReactComponent as ProjectIcon } from './images/innovation.svg'
import { ReactComponent as ProjectIcon } from './images/hexagon.svg'
import { ReactComponent as UsersIcon } from './images/group.svg'


// ==========================================
// 	SEARCH DROP-DOWN
// ==========================================
export const SearchResultsSection = (props) => {
	return (
		<div className={props.className}>
		
			<div className='flex flex-row items-center border-b border-gray-300 mb-4'>
				{ props.type === 'projects' && (<ProjectIcon className='h-6 w-6 mr-1'/>) }
				{ props.type === 'users' && (<UsersIcon className='h-6 w-6 mr-1'/>) }
				<div className='m-0 font-semibold text-gray-700 text-2xl leading-normal' style={{fontVariant:'small-caps'}}>{props.type}</div>
			</div>


			{ props.results[props.type].length === 0 && (
				<div className='italic'>No {props.type} found</div>
			)}

			<>
			{ (props.results[props.type].length != 0 ) && 
				props.results[props.type].map((result, i) => {
					return ( 
						<SearchResultItem key={i} data={result} type={props.type} className='mb-4'/>
					)
				})
			}
			</>

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

const _SearchResultItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()
	let name = props.data.name 

	let creator = null
	if (!isNil(props.data.creator)) {
		if (!isNil(props.data.creator.displayName)) {
			creator = "Added by: " + props.data.creator.displayName
		}
	}

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
				className='w-16 h-16 rounded border border-blue-400 p-2 mr-2'
				style={{
					backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))'
				}}
				>
					<ProjectIcon className='w-full h-full rounded'/>
				</div>
				<div className='flex flex-col'>
					<div className='text-2xl font-medium mb-2 flex-1'>{name}</div>
					<div className='flex flex-row'>
						<UserAvatar data={props.data.creator} className='rounded h-6 w-6 flex-none'/> 
						<div className='ml-2'>{props.data.creator.displayName}</div>
					</div>
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





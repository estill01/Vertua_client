import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSearch, clearSuperbarSearch } from '../../../app/slices/SearchSlice'
import { nukeOverlays } from '../../../app/slices/PageSlice'
import { setCurrentItem, clearCurrentItem } from '../../../app/slices/ItemsSlice.js'
import { isNil } from 'lodash'
import { handleItemClick } from '../../../app/utils'


// ==========================================
// 	SEARCH DROP-DOWN
// ==========================================
export const SearchResultsSection = (props) => {
	return (
		<>
		<h3 style={{fontVariant:'small-caps'}}>{props.type}</h3>
		{ props.results[props.type].length === 0 && (
			<div className='italic'>No {props.type} found</div>
		)}

		{ (props.results[props.type].length != 0 ) && 
			props.results[props.type].map((result, i) => {
				return ( 
					<SearchResultItem key={i} data={result} type={props.type} className='mb-2'/>
				)
			})
		}
		</>
	)
}

export const SearchResultItem = (props) => {
	let name = null
	let creator = null
	const history = useHistory()
	const dispatch = useDispatch()
	if (props.type === 'users') { name = props.data.displayName } 
	else { 
		name = props.data.name 
		if (!isNil(props.data.creator)) {
			if (!isNil(props.data.creator.displayName)) {
				creator = "Added by: " + props.data.creator.displayName
			}
		}
	}

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	// console.log("[SearchResult]")
	// console.log("type: ", props.type)
	// console.log("result: ", props.data)

	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer ${props.className}`}
			onClick={handleClick}
			>
				<div className='w-10 h-10 rounded border border-blue-400 mr-2'>
					<img src={props.data.photoURL} className='w-full h-full rounded'/>
				</div>
				<div className='flex flex-col'>
					<div>{name}</div>
					<div>{creator}</div>
				</div>
			</div>
		</>
	)
}

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





import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentItem } from '../../../app/slices/ItemsSlice'
import { clearSearch } from '../../../app/slices/SearchSlice'
import { isNil } from 'lodash'



export const SearchResults = (props) => {
	return (
		<div className={`${props.className}`}>
			<SearchResultsSection type='projects' results={props.results}/>
			<SearchResultsSection type='users' results={props.results}/>
		</div>
	)
}

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

const SearchResultItem = (props) => {
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
		dispatch(setCurrentItem(props.data))
		dispatch(clearSearch())
		history.push(props.data.urlSlug)
	}

	console.log("[SearchResult]")
	console.log("type: ", props.type)
	console.log("result: ", props.data)

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


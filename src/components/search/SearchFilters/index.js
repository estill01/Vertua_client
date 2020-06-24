import React, { useEffect } from 'react'
// import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { isNil } from 'lodash'


export const SearchFilters = (props) => {
	return (
		<>
			<div className='w-40 h-auto bg-orange-100 border border-orange-200 rounded-md p-2'>
				<div>{props.results.users.length + props.results.projects.length} results.</div>
				<SearchFilterHeader type='projects' results={props.results}/>
				<SearchFilterHeader type='users' results={props.results}/>
				<SearchFilterHeader type='experiments' results={props.results}/>
				<SearchFilterHeader type='groups' results={props.results}/>
				<SearchFilterHeader type='products' results={props.results}/>
			</div>
		</>
	)
}

const SearchFilterHeader = (props) => {
	let length = null
	if (isNil(props.results[props.type])) { length = 0 }
	else { length = props.results[props.type].length }

	return (
		<>
			<div className='flex flex-row'>
				<div className='font-bold'>{props.type}</div>
				<div className='ml-2 flex-1'>
					({length})
				</div>
			</div>
		</>
	)
}

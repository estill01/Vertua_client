import React, { useEffect } from 'react'
// import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { isNil } from 'lodash'
import { ReactComponent as FiltersIcon } from './images/noun_filters_1245150.svg'

export const SearchFilters = (props) => {
	return (
		<>
			<div className={`h-auto ${props.className}`}>
				<div className='flex flex-row items-center bg-blue-100 border-b border-gray-400 p-1 text-gray-700 rounded-t-sm'>
					<FiltersIcon className='h-6 w-6'/>
					<span className='ml-1 text-lg font-semibold'>Filters</span>
				</div>
				<div className='p-2'>
					<SearchFilterType type='Projects' checked results={props.results}/>
					<SearchFilterType type='Users' checked results={props.results}/>
					<SearchFilterType type='Experiments' inactive results={props.results}/>
					<SearchFilterType type='Groups' inactive results={props.results}/>
					<SearchFilterType type='Products' inactive results={props.results}/>
				</div>
			</div>
		</>
	)
}

const SearchFilterType = (props) => {
	let length = null
	let isChecked = props.checked || false
	if (isNil(props.results[props.type])) { length = 0 }
	else { length = props.results[props.type].length }

	return (
		<>
			<div className='flex flex-row items-center'>
				<input type='checkbox' checked={isChecked} disabled={props.inactive} className='mr-1'/>
				<div className='font-normal'>{props.type}</div>
				<div className='ml-2 flex-1'>
					({length})
				</div>
			</div>
		</>
	)
}

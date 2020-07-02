import React, { useEffect } from 'react'
// import PageErrorBoundary from './PageErrorBoundary'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { isNil } from 'lodash'
import { ReactComponent as FiltersIcon } from './images/noun_filters_1245150.svg'
import { ReactComponent as ProjectIcon } from './images/hexagon.svg'
import { ReactComponent as UsersIcon } from './images/group.svg'

const Icons = {
	projects: <ProjectIcon/>,
	users: <UsersIcon className='h-4 w-4'/>,
	groups: <UsersIcon className='h-4 w-4'/>,
	experiments: <UsersIcon className='h-4 w-4'/>,
	tools: <UsersIcon className='h-4 w-4'/>,
	materials: <UsersIcon className='h-4 w-4'/>,
	products: <UsersIcon className='h-4 w-4'/>,
}

export const SearchFilters = (props) => {
	return (
		<>
			<div className={`h-auto select-none ${props.className}`}>
				<div className='flex flex-row items-center bg-blue-100 border-b border-gray-400 p-1 text-gray-700 rounded-t-sm'>
					<FiltersIcon className='h-6 w-6'/>
					<span className='ml-1 text-lg font-semibold'>Filters</span>
				</div>
				<div>
					<FilterHeader type='types' className='mb-1'/>
					<div className='px-2 py-1'>
						<SearchFilterType type='projects' checked results={props.results}/>
						<SearchFilterType type='users' checked results={props.results}/>
						<SearchFilterType type='groups' inactive results={props.results}/>
						<SearchFilterType type='experiments' inactive results={props.results}/>
						<SearchFilterType type='tools' inactive results={props.results}/>
						<SearchFilterType type='services' inactive results={props.results}/>
					</div>

					<FilterHeader type='resources' className='border-t'/>
					<FilterHeader type='engagement'/>

				</div>
			</div>
		</>
	)
}

const FilterHeader = (props) => (
	<div
	className={`font-bold text-xl px-2 py-1 bg-gray-100 text-gray-600 border-b border-gray-200 ${props.className}`}
	style={{
		fontVariant: 'small-caps',
	}}
	>
		{props.type}
	</div>
)

const SearchFilterType = (props) => {
	let length = null
	let isChecked = props.checked || false
	if (isNil(props.results[props.type])) { length = 0 }
	else { length = props.results[props.type].length }

	return (
		<>
			<div className='flex flex-row items-center cursor-pointer select-none py-1'>
				<input type='checkbox' checked={isChecked} disabled={props.inactive} className='mr-1'/>
				<div className='h-4 w-4 mr-1'>
					{ Icons[props.type] }
				</div>
				<div 
				className='font-normal text-xl'
				style={{
					fontVariant: 'small-caps'
				}}
				>
					{props.type}
				</div>
				<div 
				className='ml-2 flex-1'
				style={{
					fontVariant: 'small-caps'
				}}
				>
					({length})
				</div>
			</div>
		</>
	)
}

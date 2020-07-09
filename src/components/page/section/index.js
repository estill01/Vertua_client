import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isNil, startCase } from 'lodash'
import { ListItem } from '../../items'
import { icon } from '../../utils'
import { handleItemClick } from '../../../app/utils'


export const Section = (props) => {
	return (
		<div className={props.className}>
			<SectionHeader type={props.type}/>
			<>
			{ !isNil(props.results[props.type]) && (props.results[props.type].length !== 0 ) && 
				props.results[props.type].map((result, i) => {
					return ( 
						<ListItem key={i} data={result} type={props.type} className='mb-2'/>
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

export const SectionHeader = (props) => {
	console.log("[SectionHeader]")
	let type = startCase(props.type)

	return (
		<div 
		className='flex flex-row border-gray-300 mb-2 rounded-sm items-center pb-1 border-b' 
		>
			<div 
			className='w-6 h-6 flex items-center rounded'
			>
				{ icon(props.type, 'h-6 w-6 mx-auto') }
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

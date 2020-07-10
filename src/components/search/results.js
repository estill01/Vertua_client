import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isNil, startCase } from 'lodash'
import { handleItemClick } from '../../app/utils'
import { ListItem } from '../items'
import { icon } from '../utils'

import { SectionHeader } from '../page/section'

// ==========================================
// 	Search Result Page: Structural Elements
// ==========================================
// TODO Refactor to use /page/section stuff for everything (?)
export const SearchResultsSection = (props) => {
	return (
		<div className={props.className}>
			<SectionHeader type={props.type} className='mb-2'/>

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

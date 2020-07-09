import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentItem, clearCurrentItem } from '../../../app/slices/ItemsSlice.js'
import { handleItemClick } from '../../../app/utils'

export const UserItemMini = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	return (
		<div 
		className={`flex flex-row cursor-pointer ${props.className}`}
		onClick={handleClick}
		>
			<img src={props.data.photoURL} className='h-10 w-10 rounded'/>
			<div className='ml-2'>
				{props.data.displayName}
			</div>
		</div>
	)
}

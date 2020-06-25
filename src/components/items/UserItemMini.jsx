import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setCurrentItem, clearCurrentItem } from '../../app/slices/ItemsSlice.js'

export const UserItemMini = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		console.log("[UserItemMini]")
		console.log("urlSlug: ", props.data.urlSlug)
		history.push(`/${props.data.urlSlug}`)
		dispatch(clearCurrentItem())
		dispatch(setCurrentItem(props.data))
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

import React from 'react'
import { useHistory } from 'react-router-dom'

export const UserItemMini = (props) => {
	const history = useHistory()

	function handleClick(e) {
		console.log("[UserItemMini]")
		console.log("urlSlug: ", props.data.urlSlug)
		history.push(`/${props.data.urlSlug}`)
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

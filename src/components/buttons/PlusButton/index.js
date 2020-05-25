import React, { useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../../app/slices/PageSlice'

const PlusButton = (props) => {
	const dispatch = useDispatch()
	let isVisibleSearchDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)


	function handleClick() {
		// if the search drop down is open, turn it off
		dispatch(toggle('modal'))
		if (!isVisibleDimmer) { dispatch(toggle('dimmer')) }
		if (isVisibleSearchDropDown) { dispatch(toggle('searchDropdown')) }
	}

	return (
		<>
			<div 
			className='rounded-full bg-blue-300 hover:bg-blue-500 active:bg-blue-300 border border-blue-400 p-3 w-16 h-16 fixed cursor-pointer select-none flex items-center shadow'
			style={{
				right: '2em',
				bottom: '2em',
				zIndex: 2500,
			}}
			onClick={handleClick}
			>
				<span 
				className='text-white text-3xl text-bold mx-auto'
				>
					+
				</span>
			</div>
		</>
	)
}

export default PlusButton

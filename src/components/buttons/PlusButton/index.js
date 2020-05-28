import React, { useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../../app/slices/PageSlice'

const PlusButton = (props) => {
	const dispatch = useDispatch()
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleGlobalDimmer = useSelector(state => state.page.globalDimmer)
	let isVisibleSearchDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)

	function handleClick(e) {
		e.stopPropagation()
		dispatch(toggle('globalDimmer'))
		dispatch(toggle('creationModal'))
		if (isVisibleDimmer) { dispatch(toggle('dimmer')) }
		if (isVisibleSearchDropDown) { dispatch(toggle('searchDropdown')) }
	}

	return (
		<>
			<div 
			className='rounded-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600 border border-blue-400 p-3 w-16 h-16 fixed cursor-pointer select-none flex items-center shadow'
			style={{
				right: '2em',
				bottom: '2em',
				// zIndex: props.style.zIndex,
				zIndex: 2100,

			}}
			onClick={(e) => handleClick(e)}
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

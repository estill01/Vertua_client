import React, { useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../../app/slices/PageSlice'

const PlusButton = (props) => {
	const dispatch = useDispatch()
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleSearchDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)


	function handleClick(e) {

		if (isVisibleDimmer) { // dimmer on
			if (isVisibleCreationModal) { // dimmer on : modal on
				dispatch(toggle('dimmer'))
				dispatch(toggle('creationModal'))
			} 
			else { // dimmer on : modal off
				dispatch(toggle('creationModal'))
				if (isVisibleSearchDropDown) { // dimmer on : modal off : search on
					dispatch(toggle('searchDropdown'))
				}
			}
		} 
		else { // dimmer off
			dispatch(toggle('dimmer'))
			if (!isVisibleCreationModal) { // dimmer off : modal off
				dispatch(toggle('creationModal'))
			}
		}

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

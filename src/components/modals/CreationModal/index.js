import React, { useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import watch from 'redux-watch'

export const CreationModal = (props) => {
	const dispatch = useDispatch()
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)
	let isUserMenuOpen = useStore().getState().page.userMenu


	function handleClickContainer(e) {
		console.log("--- Click: OUTER--")
		dispatch(toggle('dimmer'))
		dispatch(toggle('userMenu'))
	}
	function handleClickModal(e) {
		console.log("--- Click: INNER --")
		e.stopPropagation()
		if (isUserMenuOpen) { dispatch(toggle('userMenu')) }
	}

	return (
		<>
		{ isVisibleCreationModal && (

			<div 
			className={`fixed w-screen h-screen top-0 left-0 flex flex-row items-center ${props.className}`} 
			onClick={(e) => handleClickContainer(e)}
			>

				<div
				className='mx-auto w-4/5 rounded border border-gray-500 shadow bg-secondary flex flex-col' 
				style={{ minHeight: '20em'}}
				onClick={(e) => handleClickModal(e)}
				>
					<div className='flex-1 flex flex-col p-4'>
						<h1>Add Project</h1>
					</div>

					<hr/>

					<div className='p-4 flex flex-row bg-primary'>
					</div>
				</div>

			</div>

			)}
		</>
	)
}
export default CreationModal

				// <div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
				// <div 
				// <div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>


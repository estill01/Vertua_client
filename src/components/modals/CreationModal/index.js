import React, { useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import watch from 'redux-watch'

import { useHistory } from 'react-router-dom'
import { ProjectForm } from '../../forms/ProjectForm'

export const CreationModal = (props) => {
	const dispatch = useDispatch()
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)
	let isUserMenuOpen = useStore().getState().page.userMenu


	function handleClickContainer(e) {
		dispatch(nukeOverlays())
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
			style={props.style}
			onClick={(e) => handleClickContainer(e)}
			>

				<div
				className='mx-auto w-4/5 rounded border border-gray-500 shadow-md bg-secondary flex flex-col' 
				style={{ 
					minHeight: '20em',
					height: '80%',
				}}
				onClick={(e) => handleClickModal(e)}
				>
					<div className='flex-1 flex flex-col p-4 rounded-t'>
						<div style={{fontVariant:'small-caps'}} className='font-extrabold mb-4'>
							new project
						</div>
						<ProjectForm/>
					</div>
					<hr/>

					<div className='p-2 flex flex-row bg-primary rounded-b'>
						<ExpandButton/>
					</div>
				</div>

			</div>

			)}
		</>
	)
}
export default CreationModal

const ExpandButton = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick() {
		// make sure you grab whatever content has been entered in the form
		dispatch(toggle('dimmer'))
		dispatch(toggle('creationModal'))
		history.push('/new')
	}
	return (
		<>
			<div 
			className='flex flex-col items-center cursor-pointer select-none'
			onClick={handleClick}
			>
				<Icon name='expand' color='blue'/>
				<a 
				className='hover:text-blue-500 active:text-blue-300'
				style={{fontVariant:'small-caps'}}
				>
					expand
				</a>
			</div>
		</>
	)
}

				// <div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
				// <div 
				// <div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>


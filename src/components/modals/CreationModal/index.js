import React, { useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import watch from 'redux-watch'

import { useHistory } from 'react-router-dom'
import { ProjectFormFull } from '../../forms/ProjectForm'
import Card from '../../utils/Card'

//	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
//	let isVisibleDimmer = useSelector(state => state.page.dimmer)
//	let isUserMenuOpen = useStore().getState().page.userMenu

export const CreationModal = (props) => {
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	return (
		<>
		{ isVisibleCreationModal && (
			<ModalCard>

				<ModalCardTopBar>
		
				</ModalCardTopBar>
				<ModalCardBody>
					<ProjectFormFull className='flex-1'/>
				</ModalCardBody>
			</ModalCard>
		)}
		</>
	)
}
export default CreationModal


// ---------------------------------------------------
const ModalFrame = (props) => {
	const dispatch = useDispatch()
	function handleClickContainer(e) {
		dispatch(nukeOverlays())
	}
	return (
		<div 
		className={`fixed w-screen h-screen top-0 left-0 flex flex-row ${props.className}`} 
		style={props.style}
		onClick={(e) => handleClickContainer(e)}
		>
			{props.children}
		</div>
	)


}

const ModalCard = (props) => {
	function handleClickModal(e) {
		console.log("--- Click: INNER --")
		e.stopPropagation()
		// if (isUserMenuOpen) { dispatch(toggle('userMenu')) }
	}

	return (
		<>
			<ModalFrame style={{zIndex:3000}}>
				<div
				className='mx-auto mt-8 w-4/5 rounded border border-gray-500 shadow-md bg-secondary flex flex-col' 
				style={{ 
					minHeight: '20em',
					height: '80%',
				}}
				onClick={(e) => handleClickModal(e)}
				>
					{props.children}
				</div>
			</ModalFrame>
		</>
	)
}

const ModalCardBody = (props) => {
	return (
		<div className='flex-1 flex flex-col p-4 rounded-b'>
			{props.children}
		</div>
	)
}


const ModalCardTopBar = (props) => {
  return (
		<div className='p-2 flex flex-row bg-primary rounded-t'>
			{props.children}
		</div>
	)
}

// -------------------------------------------------

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



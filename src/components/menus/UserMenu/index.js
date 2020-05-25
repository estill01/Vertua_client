import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStore, useSelector, useDispatch, } from 'react-redux'
import { toggle } from '../../../app/slices/PageSlice.js'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { LogInButton, LogOutButton } from '../../buttons/account'
import watch from 'redux-watch'

import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'

// TODO Fix the avatar rendering when you logout -- doesn't revert to the anonymous user svg.
export const Trigger = (props) => {
	const store = useStore()
	const dispatch = useDispatch()
	let currentUser = useSelector(state => state.session.currentUser)
	let isAnonymous = currentUser.isAnonymous
	let isMenuOpen = useSelector(state => state.page.userMenu)
	let isActive
	if (isMenuOpen) { isActive = true } else { isActive = false }
	let containerRef = React.createRef()

	useEffect(() => {
		let watchAvatarMenu = watch(store.getState, 'page.userMenu')
		let unsubscribeWatchAvatarMenu = store.subscribe(watchAvatarMenu((newVal, oldVal) => {
			isActive = newVal
			toggleContainerFocus(isActive)
		}))

		let watchURLPath = watch(store.getState, 'page.path')
		let unsubscribeWatchURLPath = store.subscribe(watchURLPath((newVal, oldVal) => {
			if (isActive) { dispatch(toggle('userMenu')) }
		}))

		return () => {
			unsubscribeWatchAvatarMenu()
			unsubscribeWatchURLPath()
		}
	})

	function toggleIsActive(val = !isActive) {
		isActive = val
		toggleContainerFocus(val)
	}
	function toggleContainerFocus(val) {
		if (val) { containerRef.current.classList.add('border-blue-500') } 
		else { containerRef.current.classList.remove('border-blue-500') }
	}

	return (
		<div {...props}>
			<div 
			className="w-10 h-10 rounded-full border border-gray-500 cursor-pointer bg-white flex p-px"
			onClick={() => dispatch(toggle('userMenu'))}
			onMouseEnter={() => { if (!isActive) { toggleIsActive() } }}
			onMouseLeave={() => { if (!isMenuOpen && isActive) { toggleIsActive() } }}
			ref={containerRef}
			>
				{ isAnonymous && (<AnonymousAvatar className='flex-1 rounded-full'/>) }
				{ !isAnonymous && (<img src={currentUser.photoURL} className='flex-1 rounded-full'/>) }
			</div>
		</div>
	)
}

const UserAvatar = (props) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let currentUser = useSelector(state => state.session.currentUser)
	return (
		<div className='relative w-full h-1/3 flex border border-gray-500 rounded'>
			{ isAnonymous && (<AnonymousAvatar className='flex-1'/>) }
			{ !isAnonymous && (<img src={currentUser.photoURL} className='flex-1'/>) }
		</div>
	)
}

export const DropDown = (props) => {
	let isVisible = useSelector(state => state.page.userMenu)
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)

	return (
		<>
			{isVisible && (
			<div 
			className={`absolute left-auto right-0 top-0 p-2 border-l border-b border-gray-400 rounded-bl w-40 h-56 flex flex-col bg-secondary ${props.className}`}
			>
				<div className='flex-1'>
					<UserAvatar/>
				</div>

				<hr/>
				{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true) && (<LogInButton/>))}
				{ (isAnonymous === false) && (<LogOutButton/>) }	
			</div>
			)}
		</>
	)
}

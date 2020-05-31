import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { useStore, useSelector, useDispatch, } from 'react-redux'
import watch from 'redux-watch'
import { toggle } from '../../../app/slices/PageSlice.js'
import { LogInButton, LogOutButton } from '../../buttons/account'
import CurrentUserAvatar from '../../utils/CurrentUserAvatar'

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
		return () => unsubscribeWatchAvatarMenu()
	})

	useEffect(() => {
		let watchURLPath = watch(store.getState, 'page.path')
		let unsubscribeWatchURLPath = store.subscribe(watchURLPath((newVal, oldVal) => {
			if (isActive) { dispatch(toggle('userMenu')) }
		}))
		return () => unsubscribeWatchURLPath()
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
				<CurrentUserAvatar className='flex-1 rounded-full'/>
			</div>
		</div>
	)
}

export const DropDown = (props) => {
	const isVisible = useSelector(state => state.page.userMenu)
	const isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	const currentUser = useSelector(state => state.session.currentUser)
	const history = useHistory()

	function handleUserAvatarClick(e) {
		console.log("-- handleUserAvatarClick --")
		console.log(e)
		history.push('/account')
	}

	return (
		<>
			{isVisible && (

			<div 
			className={`absolute left-auto right-0 top-0 p-2 border-l border-b border-gray-400 rounded-bl w-40 h-56 flex flex-col bg-secondary ${props.className}`}
			>
				<div className='flex-1'>
					<div 
					className='relative w-full h-24 flex border border-gray-500 rounded cursor-pointer hover:border-blue-300 active:border-blue-500'
					onClick={(e) => handleUserAvatarClick(e)}
					>
						<CurrentUserAvatar className='cursor-pointer'/>
					</div>
					<div className='text-center'>
					{ isAnonymous && 
						<span style={{fontVariant:'small-caps'}} className='italic'>
							logged in anonymously 
						</span> 
					}
					{ !isAnonymous && 
						<span>
							{currentUser.displayName}
						</span> 
					}
					</div>
					<hr/>
					<div>
						<Link to='/account'>Account</Link>
					</div>
				</div>

				<hr/>
				{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true) && (<LogInButton/>))}
				{ (isAnonymous === false) && (<LogOutButton/>) }	
			</div>

			)}
		</>
	)
}

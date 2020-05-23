import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../../app/slices/PageSlice.js'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
 import { LogInButton, LogOutButton } from '../../buttons/account'

import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'

export const Trigger = (props) => {
	const dispatch = useDispatch()
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let currentUser = useSelector(state => state.session.currentUser)
	let containerRef = React.createRef()

	function toggleContainerFocus(val) {
		if (val) { containerRef.current.classList.add('border-blue-500') }
		else { containerRef.current.classList.remove('border-blue-500') }
	}

			// style={{
			// 	backgroundImage: `url(${currentUser.photoURL})`
			// }}

		// onClick={()=> dispatch(multiToggle())}
		
	return (
		<div 
		{...props} 
		onClick={()=> dispatch(toggle('avatarMenu'))}
		>
			<div 
			className="w-10 h-10 rounded-full border border-gray-500 cursor-pointer bg-white flex"
			style={{ padding: '1px' }}
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
	let isVisible = useSelector(state => state.page.avatarMenu)
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


// 						<Dropdown.Menu style={{position:'absolute', left:'auto', right:0}}>
// 							<div
// 							className='p-2 border border-gray-400 rounded'
// 							>
// 								{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
// 								{ (isAnonymous === false) && (<LogOutButton/>)}
//
// 							</div>
// 						</Dropdown.Menu>
// 					</Dropdown>
// 					)
// }

// const AvatarDropDown = (props) => {
// 	return (
// 		<div {...props}> 
// 			<div className='w-10 h-10 rounded-full border border-gray-500 p-1 cursor-pointer bg-white'>
// 				<Avatar/>
// 			</div>
// 		</div>
// 	)
// }
//
//
// const SearchBar = (props) => {
// 	let containerRef = React.createRef()
//
// 	function focusContainer() {
// 		containerRef.current.classList.add('border-blue-500')
// 	}
// 	function blurContainer() {
// 		containerRef.current.classList.remove('border-blue-500')
// 	}
// 	
// 	return (
// 		<div {...props}>
// 			<div 
// 			className="p-2 bg-white rounded border border-gray-400 hover:border-blue-400 flex flex-row flex-1"
// 			ref={containerRef}
// 			>
// 				<Icon name='search mr-2'/>
// 				<input 
// 				className='flex-1'
// 				style={{ outline: 'none' }} 
// 				onFocus={() => focusContainer()}
// 				onBlur={() => blurContainer()}
// 				/>
// 			</div>
// 		</div>
// 	)
// }

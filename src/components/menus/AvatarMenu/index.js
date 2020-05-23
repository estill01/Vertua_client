import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { LogInButton, LogOutButton } from '../buttons/account'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'

// import { ReactComponent as Avatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
					

export const AvatarMenuTrigger = (props) => {
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

	return (
		<div {...props}>
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

export const AvatarMenuDropDown = (props) => {
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

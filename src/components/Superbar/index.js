import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MenuToggle } from '../menus/utils'
import { Link } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../buttons/account'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import LogoGlyph from '../utils/LogoGlyph'

import { ReactComponent as Avatar } from '../../assets/images/avatar/noun_User_2187511.svg'

import { AvatarMenuTrigger, AvatarMenuDropDown } from '../menus/AvatarMenu'
					
// <LogoGlyph className='w-6 h-6'/>

const SuperBar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	// let isLoggedIn = useSelector(state => state.session.isLoggedIn)
	// let isAnonymous = useSelector(state => state.session.
	console.log("---- SUPERBAR DEBUG ----")
	console.log("isAnonymous: ", isAnonymous )
	// bg-primary
	return (
		<div className='relative' style={{zIndex:2000}}>
			<div className='fixed w-full'>

				<div className='bg-primary px-4 py-2 flex flex-row items-center border-b border-gray-300 top-0' { ...props }>
					<MenuToggle className='flex self-center cursor-pointer' style={{marginTop: '-0.125em'}} color='grey'/>

					<Link to='/' className='text-gray-800 flex flex-row items-center ml-2'>
						<span className='ml-1 text-2xl font-logo-bold' style={{marginTop:'0.125em'}}>Vertua</span>
					</Link>

					<div className='flex flex-1 flex-row items-center'>
						<SearchBar className='mx-4 flex-1'/>
					</div>

					<div> 
						{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
						{ (isAnonymous === false) && (<LogOutButton/>)}
					</div>

					<div>
						<AvatarMenuTrigger className='ml-4'/>
					</div>
				</div>


			
			</div>
		</div>
	)
}

// <SearchDropDown/>

const SearchDropDown = (props) => {
	return (
		<div 
		className='w-4/5 rounded border border-gray-400 mx-auto bg-secondary mt-2 flex flex-col' 
		style={{ minHeight: '20em'}}
		>
			<div className='flex-1 p-4'>
				<span style={{fontVariant:'small-caps'}}>projects</span>
			</div>

			<div className='flex-1 p-4'>
				<span style={{fontVariant:'small-caps'}}>protocols</span>
			</div>

			<div className='flex-1 p-4'>
				<span style={{fontVariant:'small-caps'}}>users</span>
			</div>
			<hr/>
			<div className='p-4'>
			</div>
		</div>
	)
}

export default SuperBar


const AvatarDropDownMenu = (props) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
					return (
					<Dropdown 
					trigger={<AvatarDropDown className='ml-4'/>}
					icon={null}
					>
						<Dropdown.Menu style={{position:'absolute', left:'auto', right:0}}>
							<div
							className='p-2 border border-gray-400 rounded'
							>
								{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
								{ (isAnonymous === false) && (<LogOutButton/>)}

							</div>
						</Dropdown.Menu>
					</Dropdown>
					)
}

const AvatarDropDown = (props) => {
	return (
		<div {...props}> 
			<div className='w-10 h-10 rounded-full border border-gray-500 p-1 cursor-pointer bg-white'>
				<Avatar/>
			</div>
		</div>
	)
}


const SearchBar = (props) => {
	let containerRef = React.createRef()

	function focusContainer() {
		containerRef.current.classList.add('border-blue-500')
	}
	function blurContainer() {
		containerRef.current.classList.remove('border-blue-500')
	}
	
	return (
		<div {...props}>
			<div 
			className="p-2 bg-white rounded border border-gray-400 hover:border-blue-400 flex flex-row flex-1"
			ref={containerRef}
			>
				<Icon name='search mr-2'/>
				<input 
				className='flex-1'
				style={{ outline: 'none' }} 
				onFocus={() => focusContainer()}
				onBlur={() => blurContainer()}
				/>
			</div>
		</div>
	)
}

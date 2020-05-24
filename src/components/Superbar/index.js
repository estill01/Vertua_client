import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import { MenuToggle } from '../menus/utils'
import { LogInButton, LogOutButton } from '../buttons/account'
import LogoGlyph from '../utils/LogoGlyph'
import * as Search from './Searchbar'
import * as AvatarMenu from '../menus/AvatarMenu'
import Dimmer from '../utils/Dimmer'

// <LogoGlyph className='w-6 h-6'/>

const Superbar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let inputBarRef = React.createRef()
	
	return (
		<div className='relative' style={{zIndex:2000}}>
			<div className='fixed w-full'>
				<div className='bg-primary px-4 py-2 flex flex-row items-center border-b border-gray-300 top-0' { ...props }>
					<MenuToggle className='flex self-center cursor-pointer' style={{marginTop: '-0.125em'}} color='grey'/>

					<Link to='/' className='text-gray-800 flex flex-row items-center ml-2'>
						<span className='ml-1 text-2xl font-logo-bold' style={{marginTop:'0.125em'}}>Vertua</span>
					</Link>

					<div className='flex flex-1 flex-row items-center'>
						<Search.InputBar className='mx-4 flex-1' ref={inputBarRef}/>
					</div>

					<div> 
						{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
						{ (isAnonymous === false) && (<LogOutButton/>)}
					</div>

					<div>
						<AvatarMenu.Trigger className='ml-4'/>
					</div>
				</div>
				<div className='relative mt-0'>
					<AvatarMenu.DropDown className='z-50'/>
					<Search.DropDown className='z-40' inputBarRef={inputBarRef}/>
					<Dimmer className='z-30'/>
				</div>
			</div>
		</div>
	)
}

export default Superbar

// need to drill down into the inputbar ref to get to the input element

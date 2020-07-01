import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import { MenuToggle } from '../menus/utils'
import { LogInButton, LogOutButton } from '../buttons/account'
import * as Search from './Searchbar'
import * as UserMenu from '../menus/UserMenu'

//import Dimmer from '../utils/Dimmer'

import LogoGlyph from '../utils/LogoGlyph'


const Superbar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let superbarVisible = useSelector(state => state.page.superbar)
	let inputBarRef = React.createRef()
	const history = useHistory()


	// <MenuToggle className='flex self-center cursor-pointer' style={{marginTop: '-0.125em'}} color='grey'/>
	// <LogoGlyph style={{ height: '1.75rem', width: '1.75rem' }} />

	function goToHome() {
		history.push('/')
	}

	return (
		<>
			{ superbarVisible && (
			<div className='relative' style={{zIndex:2000}}>
				<div className='fixed w-full'>
					<div className='bg-secondary p-2 flex flex-row items-center border-b border-gray-300 top-0 shadow' { ...props }>

						<div 
						onClick={goToHome}
						className='text-gray-800 flex flex-row items-center pointer-cursor'>
							<LogoGlyph 
							className='h-6 w-6'
							style={{
								boxShadow: "4px 4px 4px #00000042",
								borderRadius: "32px",
	   					}}
							/>
							<span className='text-2xl font-logo-bold italic' style={{marginTop:'0.125em'}}>Vertua</span>
						</div>

						<div className='flex flex-1 flex-row items-center'>
							<Search.InputBar className='mx-4 flex-1' ref={inputBarRef}/>
						</div>

						<div> 
							{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
						</div>

						<div>
							<UserMenu.Trigger className='ml-4'/>
						</div>
					</div>
					<div className='relative mt-0'>
						<Search.DropDown className='z-40' inputBarRef={inputBarRef}/>
						<UserMenu.DropDown className='z-50'/>
					</div>
				</div>
			</div>
			)}
		</>
	)
}

export default Superbar

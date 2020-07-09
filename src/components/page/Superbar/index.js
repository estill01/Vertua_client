import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import { MenuToggle } from '../../menus/utils'
import { LogInButton, LogOutButton } from '../../buttons/account'
import * as Search from './Searchbar'
import * as UserMenu from '../../menus/UserMenu'
import { Logo, LogoGlyph } from '../../utils/LogoGlyph'
import { ZINDEX } from '../../utils'


const Superbar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let superbarVisible = useSelector(state => state.page.superbar)
	let inputBarRef = React.createRef()
	const history = useHistory()

	function goToHome() { history.push('/') }

							// <span className='text-2xl font-logo font-black italic' style={{marginTop:'0.125em'}}>Vertua</span>
	return (
		<>
		{ superbarVisible && (
			<div className='relative' style={{zIndex: ZINDEX.superbar}}>

				<div className='fixed w-full'>

					<div className='bg-primary p-2 flex flex-row items-center border-b border-gray-300 top-0 shadow' { ...props }>

						<div 
						onClick={goToHome}
						className='text-gray-800 flex flex-row items-center cursor-pointer select-none'>
							<LogoGlyph 
							className='h-6 w-6'
							/>
							<Logo
							dark
							className='ml-1'
							style={{ height: '1.3rem' }}
							/>
						</div>

						<div className='flex flex-1 flex-row items-center'>
							<Search.InputBar className='mx-2 md:mx-4 flex-1' ref={inputBarRef}/>
						</div>


						<div> 
							{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
						</div>

						<div>
							<UserMenu.Trigger className='ml-2'/>
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

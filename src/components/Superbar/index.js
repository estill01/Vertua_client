import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import { MenuToggle } from '../menus/utils'
import { LogInButton, LogOutButton } from '../buttons/account'
import * as Search from './Searchbar'
import * as UserMenu from '../menus/UserMenu'
import LogoGlyph from '../utils/LogoGlyph'


const Superbar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let superbarVisible = useSelector(state => state.page.superbar)
	let inputBarRef = React.createRef()
	const history = useHistory()

	function goToHome() { history.push('/') }

	return (
		<>
		{ superbarVisible && (
			<div className='relative' style={{zIndex:2000}}>

				<div className='fixed w-full'>

					<div className='bg-primary p-2 flex flex-row items-center border-b border-gray-300 top-0 shadow' { ...props }>

						<div 
						onClick={goToHome}
						className='text-gray-800 flex flex-row items-center cursor-pointer select-none'>
							<LogoGlyph 
							className='h-6 w-6'
							/>
							<span className='text-2xl font-logo font-black italic' style={{marginTop:'0.125em'}}>Vertua</span>
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

				// <div className='fixed relative w-full h-12 border-b border-gray-300 top-0 shadow bg-red-300' {...props}>
        //
				// 	<div 
				// 	onClick={goToHome}
				// 	className='h-full px-2 flex flex-row items-center cursor-pointer select-none text-gray-800 bg-blue-500'
				// 	>
				// 		<LogoGlyph 
				// 		className='h-6 w-6'
				// 		/>
				// 		<span className='text-2xl font-logo-bold font-black italic' style={{marginTop:'0.125em'}}>Vertua</span>
        //
        //
				// 	<div className='h-full absolute right-0 px-2 flex flex-row items-center bg-yellow-400'>
				// 		<div className='h-full w-auto bg-green-500'>
				// 			<Search.InputBar className='w-auto' ref={inputBarRef}/>
				// 		</div>
        //
				// 		{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
				// 		<UserMenu.Trigger className='ml-2'/>
				// 	</div>
        //
				// 	</div>


						


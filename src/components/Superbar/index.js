import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MenuToggle } from '../menus/utils'
import { Link } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../buttons/account'
import { Menu, Image, Icon } from 'semantic-ui-react'
import LogoGlyph from '../utils/LogoGlyph'

					
// <LogoGlyph className='w-6 h-6'/>

const SuperBar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	// let isLoggedIn = useSelector(state => state.session.isLoggedIn)
	// let isAnonymous = useSelector(state => state.session.
	console.log("---- SUPERBAR DEBUG ----")
	console.log("isAnonymous: ", isAnonymous )
	// bg-primary
	return (
		<>
			<div className='w-full p-4 bg-primary flex flex-row items-center border-b border-gray-300' { ...props } >

				<MenuToggle className='flex self-center cursor-pointer' style={{marginTop: '-0.125em'}} color='grey'/>

				<Link to='/' className='text-gray-800 flex flex-row items-center ml-2'>
					<span className='ml-1 text-2xl font-logo-bold' style={{marginTop:'0.125em'}}>Vertua</span>
				</Link>

				<div className='flex flex-1 flex-row items-center'>
					<SearchBar className='ml-4'/>
				</div>

				<div> 
					{ ((isAnonymous === null) || (isAnonymous === undefined) || (isAnonymous === true)) && (<LogInButton/>)}
					{ (isAnonymous === false) && (<LogOutButton/>)}
				</div>
			</div>
		</>
	)
}

export default SuperBar

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
			className="p-2 bg-white rounded border border-gray-400 hover:border-blue-400 flex flex-row"
			ref={containerRef}
			>
				<Icon name='search mr-2'/>
				<input 
				style={{ outline: 'none' }} 
				onFocus={() => focusContainer()}
				onBlur={() => blurContainer()}
				/>
			</div>
		</div>
	)
}

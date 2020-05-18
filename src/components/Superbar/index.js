import React from 'react'
import { useSelector } from 'react-redux'
import { MenuToggle } from '../menus/utils'
import { Link } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../buttons/account'
// import LanguageSelector from '../utils/LanguageSelector'

const SuperBar = ({ props } ) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	// let isLoggedIn = useSelector(state => state.session.isLoggedIn)
	// let isAnonymous = useSelector(state => state.session.
	console.log("---- SUPERBAR DEBUG ----")
	console.log("isAnonymous: ", isAnonymous )
	return (
		<>
			<div className='w-full p-4 bg-primary flex flex-row items-center' { ...props }>
				<MenuToggle/>

				<div className='text-primary text-lg font-logo-bold'>
					<Link to='/'>Vertua</Link>
				</div>

				<div className='flex flex-1 flex-row items-center'>
					<Link to='/'>Home</Link>
					<Link to='/account'>Account</Link>
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



import React from 'react'
import { useStore } from 'react-redux'
import { clearCurrentUser } from '../../../app/slices/SessionSlice'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LogInButton = () => {
	return (
	  <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center'>
			<Link to='/login' className='text-white'>Sign In</Link>
		</div>
	)
}

const LogOutButton = () => {
	let store = useStore()

	return (
	  <div 
		className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer text-center'
		onClick={() => store.dispatch(clearCurrentUser())}
		>
			Log Out
		</div>
	)
}

export { LogInButton, LogOutButton }

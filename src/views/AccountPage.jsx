import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import firebase from '../app/remote/firebase'
import { Image } from 'semantic-ui-react'

import { useSelector } from 'react-redux'


const AccountPage = () => {

	let user = useSelector(state => state.session.currentUser)
	console.log("-- Account Page --")
	console.log(user)

	return (
		<>
			<PageErrorBoundary>
				<h1>Account </h1>

				<div>
					{user.photoURL && (<Image rounded={true} size={'small'} src={user.photoURL}/>)}
					{!user.photoURL && (<h3>No avatar</h3>)}
				</div>
				<div>Display name: {user.displayName || 'null'}</div>
				<div>UID: {user.uid || 'null'}</div>
				<div>Email: {user.email || 'null'}</div>
				<div>Email Verified?: {user.emailVerified.toString()}</div>
				<div>Anonymous user?: {user.isAnonymous.toString()}</div>


				


			</PageErrorBoundary>
		</>
	)
}

export default AccountPage

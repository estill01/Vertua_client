import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import firebase from '../app/remote/firebase'
import { Image, Modal, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/utils/Card'
import { toggle } from '../app/slices/PageSlice'



const AccountPage = () => {

	let user = useSelector(state => state.session.currentUser)
	console.log("-- Account Page --")
	console.log(user)

						// {user.photoURL && (<Image rounded={true} size={'small'} src={user.photoURL}/>)}
	return (
		<>
			<PageErrorBoundary>
				<div className='h-10'/>

				<Card className='mb-4'>
					<div className='flex flex-row'>
						<div className='border border-gray-500 rounded mr-4 h-48 w-48'>
							{user.photoURL && (<img src={user.photoURL} className='rounded h-48 w-48'/>)}
							{!user.photoURL && (<h3>No avatar</h3>)}
						</div>
						<div className='flex flex-col'>
							<div className='flex flex-col flex-1'>
								<span style={{fontVariant: 'small-caps'}} className='font-extrabold'>display name</span>
								{user.displayName || 'null'}
							</div>

							<div className='flex flex-col flex-1'>
								<span style={{fontVariant: 'small-caps'}} className='font-extrabold'>joined</span>
								{user.creationTime || 'null'}
							</div>

							<div className='flex flex-col flex-1'>
								<span style={{fontVariant: 'small-caps'}} className='font-extrabold'>id</span>
								{user.uid || 'null'}
							</div>

							<div className='flex flex-col flex-1'>
								<span style={{fontVariant: 'small-caps'}} className='font-extrabold'>email</span>
								{user.email || 'null'}
							</div>
						</div>
					</div>
				</Card>

				<DeleteAccountButton/>

			</PageErrorBoundary>
		</>
	)
}
export default AccountPage



const DeleteAccountButton = (props) => {
	const dispatch = useDispatch()

	function handleClick(e) {

		dispatch(toggle('globalDimmer'))


		// open the global dimmer
		// open global modal
		// Delete Account
	}

	return (
		<>
			<Modal trigger={
				<div className='py-2 px-4 rounded bg-red-500 hover:bg-red-400 active:bg-red-600 border border-red-600 text-white cursor-pointer text-center select-none'>
					Delete Account
				</div>
			}>
				<Modal.Header>Delete account?</Modal.Header>
				<Modal.Content>
					Are you sure you want to delete your account? This action is permanent and cannot be undone.
				</Modal.Content>
				<Modal.Actions>
					<Button>Cancel</Button>
					<Button color='red'>Delete</Button>
				</Modal.Actions>
			</Modal>
		</>
	)
}



// const Card = (props) => {
// 	return (
// 	  <div className={`p-4 shadow-md rounded mt-4 border border-gray-300 ${props.className}`}>
// 			{props.children}
// 		</div>
// 	)
// }

// <div>Anonymous user?: {user.isAnonymous.toString()}</div>


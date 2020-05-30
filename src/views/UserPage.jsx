import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import firebase from '../app/remote/firebase'
import { Image, Modal, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '../components/utils/Card'
import { toggle } from '../app/slices/PageSlice'



const UserPage = (props) => {
	const dispatch = useDispatch()
	
	// const user = useSelector(state => state.)
	// TODO normalizer

	// get the data from ...
	// - search results
	// - firebase results 

//	let user = useSelector(state => state.session.currentUser)
	console.log("-- User Page --")

						// {user.photoURL && (<Image rounded={true} size={'small'} src={user.photoURL}/>)}
	return (
		<>
			<PageErrorBoundary>
				<div className='h-10'/>

				<Card className='mb-4'>
					User Page
				</Card>

			</PageErrorBoundary>
		</>
	)
}
export default UserPage

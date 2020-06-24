import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { Helmet } from 'react-helmet'
import LogInForm from '../components/forms/LogInForm'
import { 
	firebase, 
	firebaseUIConfig, 
	firebaseui 
} from '../app/remote/firebase'


// IMPORTANT: Do not remove. Prevents a rendering error.
let firebaseUIDeletion = Promise.resolve()

const FirebaseAuthUI = () => {
	console.log("==== FirebaseAuthUI ====")
	console.log("firebaseui.auth.AuthUI.getInstance: ", firebaseui.auth.AuthUI.getInstance())
	// console.log("firebaseUI: ", firebaseUI)


	firebaseUIDeletion.then(() => {
		// TODO Debug 'isPendingRedirect()' ; docs say need to do this check.

		// firebaseUI.start("#firebaseui-auth-container", firebaseUIConfig)
		firebaseui.auth.AuthUI.getInstance().start("#firebaseui-auth-container", firebaseUIConfig)

	})
	return (
		<>
			<div id="firebaseui-auth-container" className='test'>
			</div>
		</>
	)
}


const LogInPage = () => {
	console.log("==== LOG IN PAGE DEBUG ====")
	// console.log("firebaseui: ", firebaseui.auth.AuthUI.getInstance())
	// console.log("pending redirect?: ", firebaseUI.isPendingRedirect())
	
	return (
		<>
			<Helmet>
				<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css" />
			</Helmet>
			<PageErrorBoundary>
				<h1>LogIn Page</h1>
				<FirebaseAuthUI/>
			</PageErrorBoundary>
		</>
	)
}
export default LogInPage



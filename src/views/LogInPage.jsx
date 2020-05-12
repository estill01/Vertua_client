import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'
import { Helmet } from 'react-helmet'
import firebase, { firebaseUIConfig, firebaseUI } from '../app/remote/firebase'
import LogInForm from '../components/forms/LogInForm'

// can add a listener for if the app is booted or not yet
// import * as firebaseui from 'firebaseui'


const LogInPage = () => {

// const ui = new firebaseui.auth.AuthUI(firebase.auth())
	console.log("==== LOG IN PAGE DEBUG ====")
 	console.log("firebaseUI: ", firebaseUI)
	console.log("pending redirect?: ", firebaseUI.isPendingRedirect())
	
	// TODO Debupg 'isPendingRedirect()' ; docs say need to do this check.
	
	// if (ui.isPendingRedirect()) {
		firebaseUI.start('#firebaseui-auth-container', firebaseUIConfig)
	// }

	return (

		<>
			<Helmet>
				<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.5.0/firebase-ui-auth.css" />
			</Helmet>
			<PageErrorBoundary>
				<h1>LogIn Page</h1>
				<div id='firebaseui-auth-container'/>
			</PageErrorBoundary>
		</>
	)
}

export default LogInPage

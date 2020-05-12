// import firebase from 'firebase/app' // DOES NOT WORK
import firebase from 'firebase' // SDK 7.14.1 // WORKS
import * as firebaseui from 'firebaseui'

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
firebase.initializeApp(firebaseConfig)

export const firebaseUIConfig = {
	signInSuccessUrl: 'account', // make this dynamic; reference 'previousPath'
	signInOptions: [
		{
	  	provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		},
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: true,
			signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
		},
		{
			provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
		}
	  // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	  // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	  // firebase.auth.GithubAuthProvider.PROVIDER_ID,
	  // firebase.auth.AnonymousAuthProvider.PROVIDER_ID,
	],
	tosUrl: 'tos',
	privacyPolicyUrl: 'privacy',
}

// TODO Need to make this a singleton / not re-initialize on every 'LogInPage' render

export let firebaseUI = ''
export const initializeFirebaseUI = () => {
	// TODO check that auth has been loaded(?)
	firebaseUI = new firebaseui.auth.AuthUI(firebase.auth())
}


export default firebase

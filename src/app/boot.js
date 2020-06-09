import { useSelector } from 'react-redux'
import { store, firebase, initializeFirebaseUI } from './index'
import { bootAuth, bootFirestore } from './slices/FirebaseSlice'
import { 
	setCurrentUser, 
	clearCurrentUser, 
	// toggleIsLoggedIn,
} from './slices/SessionSlice'
import watch from 'redux-watch'


async function boot() {
	_rehydrateStoreFromLocalStorage()
	await _bootAuth()
	store.dispatch(bootFirestore())
}
export default boot

// =============================================

// ---------------------------------------------
// Rehydrate Store
// ---------------------------------------------
function _rehydrateStoreFromLocalStorage() {
	console.log(">> _rehydrateStoreFromLocalStorage")
	// TODO integrate the redux-session-store type stuff
	console.log("<< _rehydrateStoreFromLocalStorage")
}

// ---------------------------------------------
// Boot Auth / Authentication Listener
// ---------------------------------------------
async function _bootAuth() {
	await store.dispatch(bootAuth())
	_registerUserAuthStateChangedListener()
	initializeFirebaseUI()
}

async function _registerUserAuthStateChangedListener() {
	// TODO Return this all as a Promise (?)
	let auth = store.getState().firebase._.auth
	if (auth.isLoaded) { _onAuthStateChangedListener() }
	else if (auth.isLoading) {
		let w = watch(store.getState, 'firebase._.auth.isLoaded')
		let unsubscribe = store.subscribe(w((newVal, oldVal, objectPath) => {
			if (newVal === true) { _registerUserAuthStateChangedListener(); unsubscribe() }
		}))
	} 
	else { await store.dispatch(bootAuth()); _registerUserAuthStateChangedListener() }
}
	

function _onAuthStateChangedListener() {

	// does this get called when it's taking 'user' 
	// from local storage? 
	//
	// AKA, need to populate session.currentUser from local
	// storage


	firebase.auth().onAuthStateChanged( user => {
		
		// NB. Triggered on 'updateCurrentUser', i.e. if user signs in. 
		//
		// Scenario 1: First log-in / no currentUser
		// Action: Create anonymous user
		//
		// Scenario 2: Anonymous user logs into an account
		// Action: Sync data created by anonymous user to new account
		//
		// Scenario 3: Logged-in user logs out
		// Action: create new anonymous user
		//
		// Scenario 4: Anonymous user logs out
		// Action: create new anonymous user
		//
		//
		// Should ask user via modal if they want to 
		// sync data created by anonymous user with their 
		// now logged-in account.


		// console.log("user: ", user) 
		// console.log("currentUser: ", firebase.auth().currentUser)
    //
		// console.log("firebase.auth: ", firebase.auth)
		// console.log("firebase.auth.GoogleAuthProvider(): ", new firebase.auth.GoogleAuthProvider())


		if (user) {
			console.log("-- User logged in: ", user)
			console.log("Current User: ", firebase.auth().currentUser)

			let userObj = _buildUserObject(user)
			store.dispatch(setCurrentUser(userObj))

			// if isAnonymous
			//
			// else 

		} else {
			console.log("-- User NOT logged in: ", user)
			// store.dispatch(deleteSession(user))
			
			firebase.auth().signInAnonymously().then((resp) => {
				console.log("-- signInAnonymously resp: ", resp)
			})
		}
	})
}

function _buildUserObject(doc) {
	return {
		uid: doc.uid,
		displayName: doc.displayName,
		photoURL: doc.photoURL,
		email: doc.email,
		emailVerified: doc.emailVerified,
		isAnonymous: doc.isAnonymous,
		creationTime: doc.metadata.creationTime,
		lastSignInTime: doc.metadata.lastSignInTime,
	}
}




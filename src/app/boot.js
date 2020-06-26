import { useSelector } from 'react-redux'
import { store, firebase, initializeFirebaseUI } from './index'
import { bootAuth, bootFirestore } from './slices/FirebaseSlice'
import { 
	setCurrentUser, 
	clearCurrentUser, 
	// toggleIsLoggedIn,
} from './slices/SessionSlice'
import watch from 'redux-watch'
import { isNil } from 'lodash'


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
		
		// TODO ask user if sync data created by their anon acct w/ non-annon account on log-in.


		if (user) {
			console.log("-- User logged in: ", user)
			console.log("Current User: ", firebase.auth().currentUser)

			let userObj = _buildUserObject(user)
			console.log("[current user object]: ", userObj)
			store.dispatch(setCurrentUser(userObj))
		} else {
			console.log("-- User NOT logged in: ", user)
			// store.dispatch(deleteSession(user))
			
			firebase.auth().signInAnonymously().then((resp) => {
				console.log("-- signInAnonymously resp: ", resp)
			})
		}
	})
}

// TODO REFACTOR: Move somewhere else; maybe 'app/utils/'
function _buildUserObject(doc) {
	console.log("[buildUserObject]")
	console.log("doc: ", doc)
	let urlSlug = null
	if (isNil(doc.displayName) || doc.displayName === '') { urlSlug = '/users/' + doc.uid }
	else { 
		let slugged = doc.displayName.replace(/ /gi, '_')
		slugged = encodeURIComponent(slugged)
		urlSlug = '/users/' + slugged
	}
	console.log("urlSlug: ", urlSlug)

	return {
		uid: doc.uid,
		displayName: doc.displayName,
		photoURL: doc.photoURL,
		email: doc.email,
		emailVerified: doc.emailVerified,
		isAnonymous: doc.isAnonymous,
		creationTime: doc.metadata.creationTime,
		lastSignInTime: doc.metadata.lastSignInTime,
		urlSlug: urlSlug,
	}
}




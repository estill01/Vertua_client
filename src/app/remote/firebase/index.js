import 
	firebase, { 
	firebaseUIConfig,
	firebaseui, 
	initializeFirebaseUI, 
} from './core.js'


// -------------------------------------
//   Utility functions
// -------------------------------------
export const addToFirestore = async (arg) => {
	let firestore = firebase.firestore()
	try { 
		return firestore.collection(arg.collection).doc(arg.data.uid).set(arg.data)
	} catch (err) { throw new Error(err) }
}

export const fetchFromFirestore = async (id, type) => {
	let firestore = firebase.firestore()
	try { 
		return firestore.collection(type).doc(id).get() 
	} 
	catch (err) { throw new Error(err) }
}

export const fetchBySlug = async (type, slug) => {
	let firestore = firebase.firestore()
	let query = firestore.collection(type).where('urlSlug', '==', slug)
	let result = null
	try {
		result = await query.get()
	} catch (err) {
		throw new Error(err) 
	}
	return result.docs
}


// -------------------------------------

export { 
	firebase,
	firebaseUIConfig,
	firebaseui, 
	initializeFirebaseUI, 
}

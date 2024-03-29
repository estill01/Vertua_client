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

export const fetchTypeByOwner = async (type, ownerID) => {
	console.log("[fetchTypeByOwner]")
	console.log("type: ", type)
	console.log("ownerID: ", ownerID) 
	let firestore = firebase.firestore()
	try {
		let querySnapshot = await firestore.collection(type).where('creator.uid', '==', ownerID).get()
		let arrDocSnapshot = querySnapshot.docs 
		let docs = arrDocSnapshot.map((doc) => doc.data())
		return docs
	}
	catch (err) { throw new Error(err) }
}

export const fetchBySlug = async (type, slug) => {
	console.log("[Firebase.fetchBySlug]")
	console.log("slug: ", slug)
	console.log("type: ", type)
	let firestore = firebase.firestore()
	let query = firestore.collection(type).where('urlSlug', '==', `/${type}/${slug}`)
	let querySnapshot = null
	try {
		querySnapshot = await query.get()
	} catch (err) {
		throw new Error(err) 
	}
	let docs = querySnapshot.docs

	console.log("docs: ", docs)
	console.log("doc[0]: ", docs[0])
	console.log("doc[0].data(): ", docs[0].data())
	// TODO Sometimes Algolia fails on user creation, which then fails to make slug, so this returns undefined

	let result = docs[0].data()
	console.log("result: ", result) // array length 0

	return result
}

export const getProjectsForUser = async (userId) => {
	console.log("[Firebase.getProjectsForUser]")
	console.log("userId: ", userId)
	let firestore = firebase.firestore()
	let query = firestore.collection('projects').where('creator.uid', '==', userId)
	let querySnapshot = await query.get()
	let docs = querySnapshot.docs.map((doc, i) => {
		doc = doc.data()
		// TODO Refactor to remove 'docRef' from creator
		delete doc.creator.docRef 
		return doc 
	})

	// console.log("received - snapshot: ", querySnapshot)
	console.log("received - docs: ", docs)

	return docs
	// return querySnapshot.docs
}


// -------------------------------------

export { 
	firebase,
	firebaseUIConfig,
	firebaseui, 
	initializeFirebaseUI, 
}

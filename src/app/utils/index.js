// import { useStore, useDispatch } from 'react-redux'
import { isNil } from 'lodash'
import { nanoid } from 'nanoid'
import { _createItem as createItemAction } from '../slices/ItemsSlice'
import { store } from '../index'
import { firebase } from '../remote'

export const addToFirestore = async (arg) => {
	let firestore = firebase.firestore()
	try { 
		let response = await firestore.collection(arg.collection).add(arg.data) 
		let doc = await response.get()
		return doc.data()
	} catch (err) { throw new Error(err) }
}

export const createItem = async ({ values, collection, itemId }) => {
	if (isNil(values)) { throw new Error("[createItem()] function parameter 'values' cannot be undefined.") }
	if (isNil(collection)) { throw new Error("[createItem()] function parameter 'collection' cannot be undefined.") }
	if (isNil(itemId)) { itemId = nanoid() }
	const state = store.getState()
	const currentUser = state.session.currentUser

	let doc = {
		data: {
			...values,
			uid: itemId,
			creatorId: currentUser.uid,
		},
		collection: collection, 
	}

	try { 
		let result = await store.dispatch(createItemAction(doc)) 
		return result
	} catch (err) { throw new Error(err) }

}

export const Collection = {
	PROJECTS: 'projects',
}

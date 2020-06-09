// import { useStore, useDispatch } from 'react-redux'
import { isNil } from 'lodash'
import { nanoid } from 'nanoid'
import { createItem as createItemAction } from '../slices/ItemsSlice'
import { store } from '../index'


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

	let result
	try { result = await store.dispatch(createItemAction(doc)) }
	catch (err) { throw new Error(err) }

	return result
}

export const Collection = {
	PROJECTS: 'projects',
}

import { isNil } from 'lodash'
import { nanoid } from 'nanoid'
import { _createItem as createItemAction } from '../slices/ItemsSlice'
import { store } from '../index' // NB Import store directly b/c these function(s) are not a component and thus not in the <Provider/> tree.

import { clearSuperbarSearch } from '../slices/SearchSlice.js'
import { setCurrentItem, fetchBySlug } from '../slices/ItemsSlice.js'
import { nukeOverlays } from '../slices/PageSlice.js'

export const Collection = {
	PROJECTS: 'projects',
}

export const createItem = async ({ values, collection, uid }) => {
	if (isNil(values)) { throw new Error("[createItem()] function parameter 'values' cannot be undefined.") }
	if (isNil(collection)) { throw new Error("[createItem()] function parameter 'collection' cannot be undefined.") }
	if (isNil(uid)) { uid = nanoid() }
	const state = store.getState()
	const currentUser = state.session.currentUser

	let doc = {
		data: {
			...values,
			uid: uid,
			creator: {
				uid: currentUser.uid
			},
		},
		collection: collection, 
	}
	console.log("[createItem]")
	console.log("doc: ", doc)

	try { 
		let result = await store.dispatch(createItemAction(doc)) 
		return result
	} catch (err) { throw new Error(err) }
}


export const handleItemClick = (item) => {
	store.dispatch(nukeOverlays())
	store.dispatch(clearSuperbarSearch())
	store.dispatch(setCurrentItem(item))
}

export const fetchCurrentItem = (async () => {
	console.log("[fetchCurrentItem]")

	const state = store.getState()
	const hasCurrent = state.items.hasCurrent
	const currentItem = state.items.current

	// console.log("hasCurrent: ", hasCurrent)
	// console.log("currentItem: ", currentItem)
	// console.log("window.location: ", window.location)

	async function loadData() {
		console.log("[loadData]")
		let path = window.location.pathname.split('/')
		await store.dispatch(fetchBySlug({type: path[1], slug: path[2]}))
	}

	if (
		( hasCurrent && currentItem.urlSlug !== window.location.pathname ) ||
		!hasCurrent
	) {
		await loadData()
	}
})



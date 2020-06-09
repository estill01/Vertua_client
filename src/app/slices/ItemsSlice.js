import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { firebase } from '../remote'

export const createItem =
	createAsyncThunk('items/create',
	async (arg, thunkAPI) => {
		console.log("[createItem]")
		console.log("arg: ", arg)
		// data: {
		//   name
		//   description
		//   uid
		// }
		// type

		let token = await firebase.auth().currentUser.getIdToken()
		console.log("auth token: ", token)
		console.log("firebase.app(): ", firebase.app())
		console.log("firebase.firestore():", firebase.firestore())
		// setRequestHeader

		let firestore = new firebase.firestore() // TODO move this into slice (?)
		let response = await firestore.collection(arg.collection).add(arg.data)
		let doc = await response.get()
		console.log("[createItem] doc.data(): ", doc.data())
		return doc.data()
	},
	{ condition: () => {
	}}
)


export const ItemsSlice = createSlice({
	name: 'items',
	initialState: {
		status: 'idle',
		isLoading: false,
		current: {},
	},
	reducers: {
		setCurrentItem: (state, action) => {
			state.items.current = action.payload
		}
	},
	extraReducers: {
		[createItem.pending]: (state, action) => {
			console.log("[items/create/pending]")
			console.log("action.payload: ", action.payload)

			state.status = 'pending'
			state.isLoading = true
		},
		[createItem.rejected]: (state, action) => {
			console.log("[items/create/rejected]")
			console.log("action.payload: ", action.payload)

			state.status = 'error'
			state.isLoading = false
		},
		[createItem.fulfilled]: (state, action) => {
			console.log("[items/create/fulfilled]")
			console.log("action.payload: ", action.payload)

			state.status = 'idle'
			state.isLoading = false

		},
	}
})

export const {
	setCurrentItem,
} = ItemsSlice.actions

export default ItemsSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { firebase, addToFirestore } from '../remote/firebase/index.js'

// NB. Do not dispatch '_createItem' directly; use 'createItem' in './app/utils' instead.
export const _createItem =
	createAsyncThunk('items/_create',
	async (arg, thunkAPI) => addToFirestore(arg),
)

export const ItemsSlice = createSlice({
	name: 'items',
	initialState: {
		status: 'idle',
		isLoading: false,
		hasCurrent: false,
		current: {},
	},
	reducers: {
		setCurrentItem: (state, action) => {
			console.log("[setCurrentItem]")
			console.log(action.payload)
			state.current = action.payload
			state.hasCurrent = true
		}
	},
	extraReducers: {
		[_createItem.pending]: (state, action) => {
			console.log("[items/_create/pending]")
			console.log("action.payload: ", action.payload)

			state.status = 'pending'
			state.isLoading = true
		},
		[_createItem.rejected]: (state, action) => {
			console.log("[items/_create/rejected]")
			console.log("action.payload: ", action.payload)

			state.status = 'error'
			state.isLoading = false
		},
		[_createItem.fulfilled]: (state, action) => {
			console.log("[items/_create/fulfilled]")
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

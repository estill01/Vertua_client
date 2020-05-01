import { createSlice } from '@reduxjs/toolkit'

export const PageSlice = createSlice({
	name: 'page',
	initialState: {
		title: 'Vertua | #BuildTheFuture',
		scrollLock: false,
		dimmer: false,
		modal: false,
		sideNav: false,
		superbar: true,
	},
	reducers: {
		toggle: (state, action) => {
			state[action.payload] = !state[action.payload]
		},
		setTitle: (state, action) => {
			state.title = action.payload
		}
	}
})

export const { toggle, setTitle } = PageSlice.actions

export default PageSlice.reducer

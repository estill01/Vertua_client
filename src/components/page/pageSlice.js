import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
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

export const { toggle, setTitle } = pageSlice.actions

export default pageSlice.reducer

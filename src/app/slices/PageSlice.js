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
		path: {
			current: '',
			previous: '',
		}
	},
	reducers: {
		toggle: (state, action) => {
			state[action.payload] = !state[action.payload]
		},
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setCurrentPath: (state, action) => {
			state.path.current = action.payload
		},
		setPreviousPath: (state, action) => {
			state.path.previous = action.payload
		},
	}
})

export const { toggle, setTitle } = PageSlice.actions

export default PageSlice.reducer

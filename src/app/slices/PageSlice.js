import { createSlice } from '@reduxjs/toolkit'

export const PageSlice = createSlice({
	name: 'page',
	initialState: {
		title: 'Vertua | #BuildTheFuture',
		scrollLock: false,
		superbar: true,
		dimmer: false,
		modal: false,
		sideNav: false,
		searchDropdown: false,
		avatarMenu: false,
		path: {
			current: '',
			previous: '',
		}
	},
	reducers: {
		toggle: (state, action) => {
			state[action.payload] = !state[action.payload]
		},
		menuToggle: (state, action) => {
			state.menu[action.payload] = !state.menu[action.payload]
		},
		menuMultiToggle: (state, action) => {
			action.payload.forEach((item) => {
				// state.menu[item] state.menu[item]
			})
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

import { createSlice } from '@reduxjs/toolkit'

export const PageSlice = createSlice({
	name: 'page',
	initialState: {
		title: 'Vertua | #BuildTheFuture',
		scrollLock: false,
		superbar: true,
		dimmer: false,
		globalDimmer: false, // TMP
		creationModal: false, // TMP
		sideNav: false,
		searchDropdown: false,
		userMenu: false,
		plusButton: true,
		path: ''
	},
	reducers: {
		toggle: (state, action) => {
			state[action.payload] = !state[action.payload]
		},
		nukeOverlays: (state, actions) => {
			state.dimmer = false
			state.globalDimmer = false
			state.creationModal = false
			state.sideNav = false
			state.searchDropdown = false
			state.userMenu = false
		},
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setPath: (state, action) => {
			if (state.path != action.payload ) { state.path = action.payload }
			// if state. import store
			// > look to ItemsStore to see if there's a current item (?)
			// > Or, set currentItem on page (?)
		},
		setPreviousPath: (state, action) => {
			state.path.previous = action.payload
		},
	}
})

export const { 
	toggle, 
	nukeOverlays, 
	setTitle,
	setPath,
} = PageSlice.actions

export default PageSlice.reducer

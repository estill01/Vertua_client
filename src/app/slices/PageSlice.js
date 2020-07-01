import { createSlice } from '@reduxjs/toolkit'

const initialState = {
		scrollLock: false,
		superbar: true,
		footer: true,
		dimmer: false,
		globalDimmer: false, // TMP (?)
		creationModal: false, // TMP (?)
		sideNav: false,
		searchDropdown: false,
		userMenu: false,
		plusButton: true,
}

export const PageSlice = createSlice({
	name: 'page',
	initialState: {
		...initialState,
		title: 'Vertua | #BuildTheFuture',
		path: '',
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
		nukeAll: (state, actions) => {
			state.dimmer = false
			state.globalDimmer = false
			state.creationModal = false
			state.sideNav = false
			state.searchDropdown = false
			state.userMenu = false
			state.superbar = false
			state.plusButton = false
			state.footer = false
		},
		resetPage: (state, action) => {
			state.scrollLock = initialState.scrollLock
			state.superbar = initialState.superbar
			state.footer = initialState.footer
			state.dimmer = initialState.dimmer
			state.globalDimmer = initialState.globalDimmer
			state.creationModal = initialState.creationModal
			state.sideNav = initialState.sideNav
			state.searchDropdown = initialState.searchDropdown
			state.userMenu = initialState.userMenu
			state.plusButton = initialState.plusButton
		},
		setTitle: (state, action) => {
			state.title = action.payload
		},
		setPath: (state, action) => {
			// TODO Why is this not triggering on fwd/back to user page?
			if (state.path != action.payload ) { 
				state.path = action.payload 
			 	window.scrollTo(0,0)
			}
		},
		setPreviousPath: (state, action) => {
			state.path.previous = action.payload
		},
	}
})

export const { 
	toggle, 
	nukeOverlays, 
	nukeAll,
	setTitle,
	setPath,
	resetPage,
} = PageSlice.actions

export default PageSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import firebase from '../remote/firebase'

// const createSession = createAsyncThunk(
// 	'session/createSession',
// 	async (userApi, thunkApi) => {
// 		// thunkApi.useState()
// 		// const response = await userAPI.fetchById(userId)
// 		// return response.data
// 	},
// 	{
// 		condition: (userId, { getState, extra }) => {
// 			// const { users } = getState()
// 			// const fetchStatus = users.requests[userId]
// 			// if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
// 			// 	return false
// 			// }
// 		}
// 	}
// )
//
// export const expireSession = createAsyncThunk(
//   'session/expireSession',
// 	async (arg, thunkApi) => {
// 	}
// )
//
// export const updateSession = createAsyncThunk(
// 	'session/updateSession',
// 	async (arg, thunkApi) => {
// 	}
// )

export const SessionSlice = createSlice({
	name: 'session',
	initialState: {
		loading: 'idle',
		isLoggedIn: false,
		currentUser: {
			displayName: '',
			email: '',
			emailVerified: '',
			isAnonymous: '',
			creationTime: '',
			lastSignInTime: '',
			photoURL: '',
			uid: '',
		}
	},
	reducers: {
		setCurrentUser: (state, action) => {
			console.log("-- setCurrentUser")
			console.log('action.payload: ', action.payload)
			state.isLoggedIn = true
			let user = action.payload
			state.currentUser = {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				isAnonymous: user.isAnonymous,
				creationTime: user.metadata.creationTime,
				lastSignInTime: user.metadata.lastSignInTime,
				photoURL: user.photoURL,
			}
		},
		clearCurrentUser: (state, action) => {
			state.currentUser = {
				displayName: '',
				email: '',
				emailVerified: '',
				isAnonymous: '',
				creationTime: '',
				lastSignInTime: '',
				photoURL: '',
				uid: '',
			}
			state.isLoggedIn = false
			// TODO clear local storage
		},
		// toggleIsLoggedIn: (state, action) => {
		// 	console.log("## TOGGLE LOGEDD IN") 
		// 	console.log(action.payload)
		// 	state.isLoggedIn = !state.isLoggedIn
		// }
	},
	extraReducers: { 
		// ** createSession ** 
		// ------------------- 
		// [createSession.pending]: (state, action) => {
		// 	state.loading = 'pending'
		// },
		// [createSession.fulfilled]: (state, action) => {
		// 	state.loading = 'idle'
		// },
		// [createSession.rejected]: (state, action) => {
		// 	state.loading = 'idle'
		// 	// TODO ... what do we do if we can't create a session(?)
		// },
    //
		// // ** updateSession **
		// // -------------------
		// [updateSession.pending]: (state, action) => {
		// 	state.loading = 'pending'
		// },
		// [updateSession.fulfilled]: (state, action) => {
		// 	state.loading = 'idle'
		// },
		// [updateSession.rejected]: (state, action) => {
		// 	state.loading = 'idle'
		// },
    //
		// // ** expireSession **
		// // -------------------
		// [expireSession.pending]: (state, action) => {
		// 	state.loading = 'pending'
		// },
		// [expireSession.fulfilled]: (state, action) => {
		// 	state.loading = 'idle'
		// 	// .. then what? new session
		// 	// can we log-out from an anonymous account ; No
		// },
		// [expireSession.rejected]: (state, action) => {
		// 	state.loading = 'idle'
		// 	// TODO try again.
		// },
	}
})



//	toggleIsLoggedIn
export const { 
	setCurrentUser,
	clearCurrentUser,
} = SessionSlice.actions

export default SessionSlice.reducer

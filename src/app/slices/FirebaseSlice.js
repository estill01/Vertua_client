import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from '../remote/firebase'


// TODO Move these somewhere else out of the way
function shouldCancelBoot(state, lib) {
	if (
		state.firebase._[lib].isLoading === true || 
		state.firebase._[lib].isLoaded === true
	) { return false /* returning 'false' triggers cancel */ }
}

export const bootAuth =
	createAsyncThunk('firebase/bootAuth', 
	async (_, thunkApi) => import('firebase/auth'),
	{ condition: (_, { getState }) => shouldCancelBoot(getState(), 'auth') })

export const bootFirestore = 
	createAsyncThunk('firebase/bootFirestore', 
	async (_, thunkApi) => import('firebase/firestore'),
	{ condition: (_, { getState }) => shouldCancelBoot(getState(), 'firestore') })

export const bootFunctions = 
	createAsyncThunk('firebase/bootFunctions', 
	async (_, thunkApi) => import('firebase/functions'),
	{ condition: (_, { getState }) => shouldCancelBoot(getState(), 'functions') })

export const bootStorage =
	createAsyncThunk('firebase/bootStorage', 
	async (_, thunkApi) => import('firebase/storage'),
	{ condition: (_, { getState }) => shouldCancelBoot(getState(), 'storage') })

export const bootAnalytics = 
	createAsyncThunk('firebase/bootAnalytics', 
	async (_, thunkApi) => import('firebase/analytics'),
	{ condition: (_, { getState }) => shouldCancelBoot(getState(), 'analytics') })


// TODO Obviously would be better if the firebase instance were stashed in the store, but that doesn't seem to play nicely with Redux.
export const FirebaseSlice = createSlice({
	name: 'firebase',
	initialState: {
		_: {
			auth: 		 { isLoaded: false, isLoading: false }, 
			firestore: { isLoaded: false, isLoading: false },
			functions: { isLoaded: false, isLoading: false },
			storage: 	 { isLoaded: false, isLoading: false },
			analytics: { isLoaded: false, isLoading: false },
		}
	},
	reducers: {
		bootApp: (state, action) => {
			console.log(">> bootApp")
			// state.app = firebase
			console.log("<< bootApp")
		},
	},
	extraReducers: {
		[bootAuth.pending]:   		 (state, action) => { state._.auth.isLoading = true  },
		[bootAuth.rejected]:  		 (state, action) => { state._.auth.isLoading = false },
		[bootAuth.fulfilled]: 		 (state, action) => { state._.auth.isLoading = false ; 
																										state._.auth.isLoaded  = true  },

		[bootFirestore.pending]:   (state, action) => { state._.firestore.isLoading = true  },
		[bootFirestore.rejected]:  (state, action) => { state._.firestore.isLoading = false },
		[bootFirestore.fulfilled]: (state, action) => { state._.firestore.isLoading = false ; 
																										state._.firestore.isLoaded  = true  },

		[bootFunctions.pending]:   (state, action) => { state._.functions.isLoading = true  },
		[bootFunctions.rejected]:  (state, action) => { state._.functions.isLoading = false },
		[bootFunctions.fulfilled]: (state, action) => { state._.functions.isLoading = false ; 
																							 			state._.functions.isLoaded  = true  },

		[bootStorage.pending]:   	 (state, action) => { state._.storage.isLoading = true  },
		[bootStorage.rejected]:  	 (state, action) => { state._.storage.isLoading = false },
		[bootStorage.fulfilled]: 	 (state, action) => { state._.storage.isLoading = false ; 
																							    	state._.storage.isLoaded  = true  },

		[bootAnalytics.pending]:   (state, action) => { state._.analytics.isLoading = true  },
		[bootAnalytics.rejected]:  (state, action) => { state._.analytics.isLoading = false },
		[bootAnalytics.fulfilled]: (state, action) => { state._.analytics.isLoading = false ; 
																							 			state._.analytics.isLoaded  = true  },
	}
})

export const { bootApp } = FirebaseSlice.actions
export default FirebaseSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const bootAuth = createAsyncThunk(
  'firebase/bootAuth',
	async (arg, thunkApi) => {
		// check if already true || booting in 'condition'
		// so then here, can just lazy load the firebase auth stuff

		// let lib = 'firebase/' + arg
		// return import(lib)
		return import('firebase/auth')

		// return import(`firebase/${arg}`).then((result) => {
		// 	console.log(">> firebase boot result:")
		// 	console.log(result)
		// })
	},
)


export const FirebaseSlice = createSlice({
	name: 'firebase',
	initialState: {
		app: {
			isLoaded: false,
			isLoading: false 
		},
		auth: {
			isLoaded: false,
			isLoading: false
		},
		firestore: {
			isLoaded: false,
			isLoading: false
		},
		functions: {
			isLoaded: false,
			isLoading: false
		},
		storage: {
			isLoaded: false,
			isLoading: false
		},
		analytics: {
			isLoaded: false,
			isLoading: false
	  },
	},
	reducers: {
	},
	extraReducers: {
		[bootAuth.pending]: (state, action) => {
			console.log("## bootAuth.pending")
			console.log(action)
			state.auth.isLoading = true
		},
		[bootAuth.fulfilled]: (state, action) => {
			console.log("## bootAuth.fulfilled")
			console.log(action)
			state.auth.isLoaded = true
			state.auth.isLoading = false
		},
		[bootAuth.rejected]: (state, action) => {
			console.log("## bootAuth.rejected")
			console.log(action)
			state.auth.isLoading = false
		}
	}
})

	// {
	// 	condition: (arg, { getState, extra }) => {
	// 		const { fetcher } = getState()
	// 		if ( fetcher.firebase.auth.isLoaded === true )  {
	// 			return false
	// 		}
	// 	}
	// }
  //



export default FirebaseSlice.reducer

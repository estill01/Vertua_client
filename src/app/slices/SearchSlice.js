import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebase, algolia } from '../remote'

// search() - search all indexes
// searchUsers() - search users index
// searchProjects() - search projects index
// multiSearch() - perform multiple searches on per-search specified indexes

/*
 * Search all indexes
 */
export const search = 
  createAsyncThunk('search/search',
	async (arg, thunkAPI) => {
		let state = thunkAPI.getState()

		console.log("# Search:search")
		thunkAPI.dispatch(setQuery(arg)) 

		// TODO debug Promise.all / etc so that these get executed in parallel
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
		//
		// let promises = []
		// thunkAPI.action.payload.index.map((index) => {
		// 	promises.push(new Promise((resolve, reject) => { 
		// 		resolve(algolia[index].search(arg))
		// 	}))
		// })

		// return Promise.all(promises)
		return algolia.users.search(arg)
	},
	{ condition: () => {
		// TODO When not trigger? Review API for 'condition'
		
	}}
)

export const SearchSlice = createSlice({
	name: 'search',
	initialState: {
		isLoading: false,
		status: 'idle',
		srp: {
			query: '',
			executedAt: '',
			fulfilledAt: '',
			runtime: '',
			results: [],
		},
		query: '',
		executedAt: '',
		fulfilledAt: '',
		runtime: '',
		results: [],
	},
	reducers: {
		// isLoading: (state, action) => { state.isFetching = action.payload },
		// setStatus: (state, action) => { state.status = action.payload },
		setQuery: (state, action) => { 
			console.log("> SearchSlice.setQuery")
			state.query = action.payload 
		},
		stashSearch: (state, action) => {
			state.srp.query = state.query
			state.srp.executedAt = state.executedAt
			state.srp.fulfilledAt = state.fulfilledAt
			state.srp.runtime = state.runtime
			state.srp.results = state.results
		},
		clearSearch: (state, action) => {
			state.srp.query = ''
			state.srp.executedAt = ''
			state.srp.fulfilledAt = ''
			state.srp.runtime = ''
			state.srp.results = ''
			state.query = ''
			state.executedAt = ''
			state.fulfilledAt = ''
			state.runtime = ''
			state.results = ''
		},
		// setExectuedAt: (state, action) => {
		// 	state.executedAt = action.payload
		// 	state.fulfilledAt = ''
		// 	state.runtime = ''
		// },
		// setFulfilledAt: (state, action) => {
		// 	state.fulfilledAt = action.payload
		// 	state.runtime = state.fulfilledAt - state.executedAt
		// },
		updateResults: (state, action) => {
			console.log(" --- SearchSlice:updateResults:")
			console.log(action.payload)
		},
	},
	extraReducers: {
		[search.pending]: (state, action) => { 
			state.isLoading = true
			state.status = 'pending'
			state.executedAt = Date.now()
		 	state.fulfilledAt = ''
		 	state.runtime = ''

			console.log(" --- SeachSlice:seach.pending")
			console.log(state)
		},
		[search.rejected]: (state, action) => { 
			state.isLoading = false
			state.loading = 'error'
		 	state.fulfilledAt = Date.now()
		 	state.runtime = state.fulfilledAt - state.executedAt
		},
		[search.fulfilled]: (state, action) => { 
			state.isLoading = false
			state.loading = 'idle'
			state.fulfilledAt = Date.now()
		 	state.runtime = state.fulfilledAt - state.executedAt
			state.results = action.payload.hits
	
			console.log("> search.fulfilled")
			console.log("state.fulfilledAt: ", state.fulfilledAt)
			console.log("action.payload: ", action.payload)
		},
	}
})

export const {
	setQuery,
	stashSearch,
	clearSearch,
} = SearchSlice.actions

export default SearchSlice.reducer


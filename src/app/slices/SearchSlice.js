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

		let promises = []
		
		promises.push(new Promise((resolve, reject) => { 
			try { resolve(algolia.users.search(arg)) }
			catch (err) { reject('[Error] : users search index') }

		}))
		promises.push(new Promise((resolve, reject) => {
			try { resolve(algolia.projects.search(arg)) }
			catch (err) { reject('[Error] : users search index') }
		}))

		// TODO Need post-procesing to settle restults to proper index stash
		// payload: Array(2)
		// 0: {hits: ... , indexUsed: 'users', ...}
		// 1: {hits: ... , indexUsed: 'projects', ...}

		return Promise.all(promises)
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
			// results: [],
			results: {
				users: [],
				projects: []
			}
		},
		query: '',
		executedAt: '',
		fulfilledAt: '',
		runtime: '',
		// results: [],
		results: {
			users: [],
			projects: [],
		}
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
			state.srp.results = {}
			state.query = ''
			state.executedAt = ''
			state.fulfilledAt = ''
			state.runtime = ''
			state.results = {}
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
			console.log("[ SEARCH : PENDING ]")
			// console.log("Action: ", action)

			state.isLoading = true
			state.status = 'pending'
			state.executedAt = Date.now()
		 	state.fulfilledAt = ''
		 	state.runtime = ''

		},
		[search.rejected]: (state, action) => { 
			console.log("[ SEARCH : REJECTED ]")
			console.log("Action: ", action)

			state.isLoading = false
			state.loading = 'error'
		 	state.fulfilledAt = Date.now()
		 	state.runtime = state.fulfilledAt - state.executedAt
		},
		[search.fulfilled]: (state, action) => { 
			console.log("[ SEARCH : FULFILLED ]")
			console.log("Action: ", action)

			state.isLoading = false
			state.loading = 'idle'
			state.fulfilledAt = Date.now()
		 	state.runtime = state.fulfilledAt - state.executedAt
			// ------------------------------------------------
			// TODO  Need to make this more advanced to deal with multiple search indexes

			action.payload.map((payload) => {
				console.log("payload: ", payload)
				console.log("indexUsed: ", payload.indexUsed)
				state.results[payload.indexUsed] = payload.hits
			})
			// state.results = action.payload.hits
			// ------------------------------------------------
		},
	}
})

export const {
	setQuery,
	stashSearch,
	clearSearch,
} = SearchSlice.actions

export default SearchSlice.reducer


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
		console.log("query:  ", arg)
		console.log("state: ", state)
		console.log("state.search: ", state.search)
		// state.search.query = arg

		thunkAPI.dispatch(setQuery(arg)) // WORKS!
		console.log("state.search.query: ", state.search.query)


		//thunkAPI.dispatch(thunkAPI.dispatch(setQuery(arg)))

		// TODO debug Promise.all / etc so that these get executed in parallel
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
		//
		// let promises = []
		// run the query over all the search indexes in algolia contianer
		// algolia.search


		

		// TODO move this to 'multiSeach' (?)
		// thunkAPI.action.payload.index.map((index) => {
		// 	promises.push(new Promise((resolve, reject) => { 
		// 		resolve(algolia[index].search(arg))
		// 	}))
		// })

		// return Promise.all(promises)
		return algolia.users.search(arg)
	},
	{ condition: () => {
		
		// When not trigger? If it's already searching?
		// but then you'd miss shit.
		
		// TODO Review API for 'condition'
	}}
)

export const SearchSlice = createSlice({
	name: 'search',
	initialState: {
		isLoading: false,
		status: 'idle',
		query: '',
		executedAt: '',
		fulfilledAt: '',
		queryRuntime: '',
		results: [],
		// result: {
		// 	users: {},
		// 	projects: {},
		// },
	},
	reducers: {
		// isLoading: (state, action) => { state.isFetching = action.payload },
		// setStatus: (state, action) => { state.status = action.payload },
		setQuery: (state, action) => { 
			console.log("> SearchSlice.setQuery")
			state.query = action.payload 
		},
		// setExectuedAt: (state, action) => {
		// 	state.executedAt = action.payload
		// 	state.fulfilledAt = ''
		// 	state.queryRuntime = ''
		// },
		// setFulfilledAt: (state, action) => {
		// 	state.fulfilledAt = action.payload
		// 	state.queryRuntime = state.fulfilledAt - state.executedAt
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
		 	state.queryRuntime = ''

			console.log(" --- SeachSlice:seach.pending")
			console.log(state)
		},
		[search.rejected]: (state, action) => { 
			state.isLoading = false
			state.loading = 'error'

		 	state.fulfilledAt = Date.now()
		 	state.queryRuntime = state.fulfilledAt - state.executedAt


			// dispatch(setFulfilledAt(new Date().value))

		},
		[search.fulfilled]: (state, action) => { 
			state.isLoading = false
			state.loading = 'idle'

			state.fulfilledAt = Date.now()
		 	state.queryRuntime = state.fulfilledAt - state.executedAt
	

			console.log("> search.fulfilled")
			console.log("state.fulfilledAt: ", state.fulfilledAt)
			console.log("action.payload: ", action.payload)

			state.results = action.payload.hits

			// dispatch(setFulfilledAt(new Date().value))
		},
	}
})

export const {
	setQuery
} = SearchSlice.actions

export default SearchSlice.reducer


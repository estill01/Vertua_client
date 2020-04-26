import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'
import counterReducer from '../features/counter/counterSlice.js'

const middleware = [ ...getDefaultMiddleware() ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

export default configureStore({
	reducer: {
		counter: counterReducer
	},
	middleware
})

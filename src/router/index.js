import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'


const Loading = () => (
	<div>Loading...</div>
)


const HomePage = loadable(
	() => import('../views/HomePage'),
	{ fallback: <Loading/> }
)
const AccountPage = loadable(
  () => import('../views/AccountPage'),
	{ fallback: <Loading/> }
)
const ProjectPage = loadable(
	() => import('../views/ProjectPage'),
	{ fallback: <Loading/> }
)
const NotFoundPage = loadable(
	() => import('../views/NotFoundPage'),
	{ fallback: <Loading/> }
)


			// <ErrorBoundary>
			// </ErrorBoundary>

const Router = () => {

	HomePage.preload()
	AccountPage.preload()
	ProjectPage.preload()

	return (
		<>
			<Suspense>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route exact path='/account' component={AccountPage}/>
				<Route path='/project/:id' component={ProjectPage}/>
				<Route component={NotFoundPage}/>
			</Switch>
			</Suspense>
		</>
	)
}

export default Router


// componentDidCatch(error, info) {
// }


// import { createSlice } from '@reduxjs/toolkit'
//
// const routerSlice = createSlice({
// 	name: 'router',
// 	initialState: {
// 		error: false,
// 		// page: 'home'
// 	},
// 	reducers: {
// 		toggleError: (state, action) => {
// 			state.error = !state.error
// 		}
// 	}
// })
//

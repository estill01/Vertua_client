import React, { useEffect, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'
import PageErrorBoundary from '../views/PageErrorBoundary'
import { useStore, useDispatch } from 'react-redux'
import { store } from '../app/index'
import { setPath } from '../app/slices/PageSlice'
import { LoadingPage } from '../views/LoadingPage.jsx'

const HomePage = loadable(
	() => timeout(import('../views/HomePage'), 5000),
	{ fallback: <LoadingPage/> }
)

const UserPage = loadable(
	() => timeout(import('../views/UserPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const CreatePage = loadable(
	() => timeout(import('../views/CreatePage'), 5000),
	{ fallback: <LoadingPage/> }
)

const SearchResultsPage = loadable(
	() => timeout(import('../views/SearchResultsPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const AccountPage = loadable(
	() => timeout(import('../views/AccountPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const ProjectPage = loadable(
	() => timeout(import('../views/ProjectPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const LogInPage = loadable(
	() => timeout(import('../views/LogInPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const SignUpPage = loadable(
	() => timeout(import('../views/SignUpPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const PasswordResetPage = loadable(
	() => timeout(import('../views/PasswordResetPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const TermsOfServicePage = loadable(
	() => timeout(import('../views/TermsOfServicePage'), 5000),
	{ fallback: <LoadingPage/> }
)

const PrivacyPolicyPage = loadable(
	() => timeout(import('../views/PrivacyPolicyPage'), 5000),
	{ fallback: <LoadingPage/> }
)

const NotFoundPage = loadable(
	{ fallback: <LoadingPage/> }
)

const ProductPage = loadable(
	{ fallback: <LoadingPage/> }
)

						// <Route exact path='/profile'
						// render={(routeProps) => {
						// 	dispatch(setPath(routeProps.location.pathname))
						// 	return (<UserPage/>)
						// }}
						// />

const Router = () => {
	let dispatch = useDispatch()
	const store = useStore()
	return (
		<>
			<PageErrorBoundary>
				<Suspense>
					<Switch>
						<Route exact path='/load'
						render={(routeProps) => {
							return ( <LoadingPage/>)
						}}
						/>
						<Route exact path='/' 
						render={(routeProps) => { 
							//dispatch(setPath('/')); 
							dispatch(setPath(routeProps.location.pathname))
							return (<HomePage/>)
							}}
						/>

						<Route path='/search' 
						render={(routeProps) => { 
							dispatch(setPath('/search')); 
							return (<SearchResultsPage/>)
						}}
						/>

						<Route exact path='/account' 
						render={(routeProps) => { 
							dispatch(setPath('/account')); 
							return (<AccountPage/>)
						}}
						/>

						<Route exact path='/users/:id' 
						render={(routeProps) => {
							dispatch(setPath(routeProps.location.pathname))
							return (<UserPage/>)
						}}
						/>

						<Route exact path='/new' 
						render={(routeProps) => {
							dispatch(setPath('/new')); 
							return (<CreatePage/>)
						}}
						/>

						<Route exact path='/projects/:id' 
						render={(routeProps) => {
							dispatch(setPath(routeProps.location.pathname))
							return (<ProjectPage/>)
						}}
						/>

						<Route path='/products/:id'
						render={(routeProps) => {
							// console.log("[ROUTER]")
							// console.log(routeProps)
							// TODO firebase query for product by 'url' string; so, on create, create a url-ified version from name
							// TODO Fetch data and populate store, or do in page(?)
							dispatch(setPath(routeProps.location.pathname))
							// routeProps.match.params.id

							return (<ProductPage/>)
						}}
						/>

						<Route 
						exact 
						path='/login' 
						render={ routeProps => {
							dispatch(setPath('login'))

							// console.log("=== ROUTER DEBUG +++")
							// console.log("session: ", store.getState().session)
							// let isLoggedIn = store.getState().session.isLoggedIn
							// console.log("isLoggedIn: ", isLoggedIn)

							return ( <LogInPage/> )

							// if (isLoggedIn) { return ( <HomePage/> ) 
							// } else {  return ( <LogInPage/> ) }

						}}
						/>

						<Route exact path='/signup' component={SignUpPage}/>
						<Route exact path='/password_reset' component={PasswordResetPage}/>
						<Route exact path='/tos' component={TermsOfServicePage}/>
						<Route exact path='/privacy' component={PrivacyPolicyPage}/>
						<Route component={NotFoundPage}/>

					</Switch>
				</Suspense>
			</PageErrorBoundary>
		</>
	)
}

export default Router

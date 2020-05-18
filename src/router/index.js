import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'
import PageErrorBoundary from '../views/PageErrorBoundary'
import { useStore } from 'react-redux'
import { store } from '../app/index'

const Loading = () => (
	<div>Loading...</div>
)

const HomePage = loadable(
	() => timeout(import('../views/HomePage'), 5000),
	{ fallback: <Loading/> }
)

const AccountPage = loadable(
	() => timeout(import('../views/AccountPage'), 5000),
	{ fallback: <Loading/> }
)

const ProjectPage = loadable(
	() => timeout(import('../views/ProjectPage'), 5000),
	{ fallback: <Loading/> }
)

const LogInPage = loadable(
	() => timeout(import('../views/LogInPage'), 5000),
	{ fallback: <Loading/> }
)

const SignUpPage = loadable(
	() => timeout(import('../views/SignUpPage'), 5000),
	{ fallback: <Loading/> }
)

const PasswordResetPage = loadable(
	() => timeout(import('../views/PasswordResetPage'), 5000),
	{ fallback: <Loading/> }
)

const TermsOfServicePage = loadable(
	() => timeout(import('../views/TermsOfServicePage'), 5000),
	{ fallback: <Loading/> }
)

const PrivacyPolicyPage = loadable(
	() => timeout(import('../views/PrivacyPolicyPage'), 5000),
	{ fallback: <Loading/> }
)

const NotFoundPage = loadable(
	() => timeout(import('../views/NotFoundPage'), 5000),
	{ fallback: <Loading/> }
)


const Router = () => {

	// HomePage.preload()
	// AccountPage.preload()
	// ProjectPage.preload()

	return (
		<>
			<PageErrorBoundary>
				<Suspense>
					<Switch>
						<Route exact path='/' component={HomePage}/>
						<Route exact path='/account' component={AccountPage}/>
						<Route path='/project/:id' component={ProjectPage}/>

						<Route 
						exact 
						path='/login' 
						// component={LogInPage}
						render={ routeProps => {
							console.log("=== ROUTER DEBUG +++")
							console.log("session: ", store.getState().session)
							
							let isLoggedIn = store.getState().session.isLoggedIn
							console.log("isLoggedIn: ", isLoggedIn)
							// TODO use a watcher?
							// TODO Fix: This is not working likely b/c the redux store is behind schedule

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

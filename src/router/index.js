import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'
import PageErrorBoundary from '../views/PageErrorBoundary'

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
						<Route component={NotFoundPage}/>
					</Switch>
				</Suspense>
			</PageErrorBoundary>
		</>
	)
}

export default Router

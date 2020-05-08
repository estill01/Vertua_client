import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import LogInForm from '../components/forms/LogInForm'

const HomePage = () => (
	<>
		<PageErrorBoundary>
		  <h1>Home Page</h1>
			<LogInForm/>
		</PageErrorBoundary>
	</>
)

export default HomePage

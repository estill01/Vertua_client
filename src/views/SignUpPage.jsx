import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import LogInForm from '../components/forms/LogInForm'

const SignUpPage = () => (
	<>
		<PageErrorBoundary>
		  <h1>SignUpPage</h1>
			<LogInForm/>
		</PageErrorBoundary>
	</>
)

export default SignUpPage

import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import LogInForm from '../components/forms/LogInForm'

const PasswordResetPage = () => (
	<>
		<PageErrorBoundary>
		  <h1>Password Reset Page</h1>
			<LogInForm/>
		</PageErrorBoundary>
	</>
)

export default PasswordResetPage

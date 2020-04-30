import React, { Component } from 'react'
import ErrorPage from './ErrorPage'

class PageErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
	}

	render() {
		if (this.state.hasError) {
			return <ErrorPage/>
		}
		return this.props.children
	}
}

export default PageErrorBoundary

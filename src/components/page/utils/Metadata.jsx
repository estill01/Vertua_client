import React from 'react';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux'

const Metadata = () => {
	const title = useSelector(state => state.page.title)

	return (
		<>
			<Helmet>
				<title>{ title }</title>
			</Helmet>
		</>
	)
}

export default Metadata

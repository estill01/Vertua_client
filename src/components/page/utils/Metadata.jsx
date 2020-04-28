import React from 'react';
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet';
import { toggle, setTitle } from '../pageSlice.js'

const Metadata = () => {
// 	let title = useSelector((state) => state.ui.page.title)
	const dispatch = useDispatch()
	const title = useSelector(state => state.page.title)

	console.log("## Metadata ##")
	console.log("title: ", title)

	dispatch(toggle('sideNav'))
	dispatch(setTitle('Doo doo plop'))

	return (
		<>
			<Helmet>
				<title>{ title }</title>
			</Helmet>
		</>
	)
}

export default Metadata

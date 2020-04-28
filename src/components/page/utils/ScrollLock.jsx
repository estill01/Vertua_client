import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactScrollLock from 'react-scrolllock'

const ScrollLock = ({ active, children }) => (
	<>
		<ReactScrollLock isActive={active}>
			{ children } 
		</ReactScrollLock>
	</>
)

ScrollLock.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node
}

const mapStateToProps = state => ({
	active: state.ui.page.scrollLock
})

export default connect(mapStateToProps)(ScrollLock)

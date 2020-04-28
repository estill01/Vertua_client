import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, connect } from 'react-redux'
import { Dimmer as SemanticUIDimmer } from 'semantic-ui-react'
// import { closeAllMenusAndDimmer } from '../../../redux/actions'

const Dimmer = ({ active, onClick }) => (
	<>
		<SemanticUIDimmer active={active} onClick={onClick}/>
	</>
)

Dimmer.propTypes = {
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	active: state.ui.page.dimmer
})
const mapDispatchToProps = (dispatch, ownProps) => ({
//	onClick: () => dispatch(closeAllMenusAndDimmer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dimmer)

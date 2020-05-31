import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nukeOverlays, toggle } from '../app/slices/PageSlice'
import { ProjectFormFull } from '../components/forms/ProjectForm'

const CreatePage = () => {
	const dispatch = useDispatch()
	const isGlobalDimmerVisible = useSelector(state => state.page.globalDimmer)
	const isCreationModalVisible = useSelector(state => state.page.creationModal)
	const isDimmerVisible = useSelector(state => state.page.dimmer)
	const isSearchDropDownVisible = useSelector(state => state.page.searchDropdown)

	// if (isGlobalDimmerVisible) { dispatch(toggle('globalDimmer')) }
	// if (isCreationModalVisible) { dispatch(toggle('creationModal')) }
	// if (isDimmerVisible) { dispatch(toggle('dimmer')) }
	// if (isSearchDropDownVisible) { dispatch(toggle('searchDropdown')) }

	return (
		<>
			<div className='h-16'/>
			<ProjectFormFull/>
		</>
	)
}

export default CreatePage

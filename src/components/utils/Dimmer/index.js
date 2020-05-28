import React from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { nukeOverlays } from '../../../app/slices/PageSlice'

const Dimmer = (props) => {
	const dispatch = useDispatch()
	const isVisible = useSelector(state => state.page[props.storePath])

	return (
		<>
		{ isVisible && (
			<div 
			className={`fixed h-screen w-screen top-0 left-0 opacity-25 bg-inverse ${props.className}`}
			onClick={() => dispatch(nukeOverlays())}
			style={props.style}
			/>
		)}
		</>
	)
}

export default Dimmer

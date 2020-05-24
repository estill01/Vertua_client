import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nukeOverlays } from '../../../app/slices/PageSlice'

const Dimmer = (props) => {
	let isVisible = useSelector(state => state.page.dimmer)
	const dispatch = useDispatch()

	return (
		<>
		{ isVisible && (
			<div 
			className={`absolute top-0 left-0 h-screen w-screen opacity-25 bg-inverse ${props.className}`}
			onClick={() => dispatch(nukeOverlays())}
			/>
		)}
		</>
	)
}

export default Dimmer

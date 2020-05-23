import React from 'react'
import { useSelector } from 'react-redux'

// TODO Integrate this with themes by changing 'bg-black' to e.g. bg-inverse
const Dimmer = (props) => {
	let isVisible = useSelector(state => state.page.dimmer)
	return (
		<>
		{ isVisible && (
			<div className={`absolute top-0 left-0 h-screen w-screen opacity-25 bg-inverse ${props.className}`}/>
		)}
		</>
	)
}

export default Dimmer

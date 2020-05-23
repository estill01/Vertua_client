import React from 'react'

// TODO Integrate this with themes by changing 'bg-black' to e.g. bg-inverse
const Dimmer = (props) => {
	return (
		<>
			<div className={`absolute top-0 left-0 h-screen w-screen opacity-25 bg-inverse ${props.className}`}/>
		</>
	)
}

export default Dimmer

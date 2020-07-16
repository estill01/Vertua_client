import React from 'react'

export const HorizontalLoader = (props) => {
	const loader = require("../../../assets/images/loaders/30.gif")
	return (
	<>
		<img 
		src={loader} 
		className={props.className}
		style={{
			height: '20px',
			width: '160px',
		}}
		/>
	</>
	)
}

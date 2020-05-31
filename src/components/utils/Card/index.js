import React from 'react'

const Card = (props) => {
	return (
	  <div className={`p-4 shadow-md rounded border border-gray-300 ${props.className}`}>
			{props.children}
		</div>
	)
}
export default Card

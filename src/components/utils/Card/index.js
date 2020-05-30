import React from 'react'

const Card = (props) => {
	return (
	  <div className={`p-4 shadow-md rounded mt-4 border border-gray-300 ${props.className}`}>
			{props.children}
		</div>
	)
}
export default Card

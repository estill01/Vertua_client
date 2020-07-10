import React from 'react'

const Card = (props) => {
	return (
	  <div className={`bg-primary p-4 shadow-sm rounded border border-gray-400 ${props.className}`}>
			{props.children}
		</div>
	)
}
export default Card

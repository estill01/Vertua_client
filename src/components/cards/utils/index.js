import React from 'react'
import { isNil } from 'lodash'

export const CardHeader = (props) => {
	let subTextColor = null
	if (isNil(props.subTextColor)) { subTextColor = 'text-gray-600' } 
	else { subTextColor = props.subTextColor }

	return (
		<>
			<div className={`pt-6 pb-2 px-4 ${props.className}`}>
				<div className={`leading-tight text-2xl font-bold ${props.textColor}`}>
					{props.text}
				</div>
				<div className={`text-lg mt-2 ${subTextColor}`}>
					{props.subText}
				</div>
			</div>
		</>
	)
}


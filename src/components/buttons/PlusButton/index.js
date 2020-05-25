import React, { useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux'

const PlusButton = (props) => {
	return (
		<>
			<div 
			className='rounded-full bg-blue-300 hover:bg-blue-500 active:bg-blue-300 border border-blue-400 p-3 w-16 h-16 fixed bottom-0 right-0 cursor-pointer select-none flex items-center shadow'
			style={{
				right: '2em',
				bottom: '2em',
				zIndex: 2500,
			}}
			>
				<span 
				className='text-white text-3xl text-bold mx-auto'
				>
					+
				</span>
			</div>
		</>
	)
}

export default PlusButton

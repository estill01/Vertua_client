import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { Button } from 'semantic-ui-react'


const RegisterCROCard = () => {
	return (
		<>
			<div 
			style={{
				backgroundImage: `url(${require('./images/image.jpeg')})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				height: '18rem',
				// backgroundImage: 'linear-gradient(to bottom right, yellow, orange'
			}}
			className='p-4 flex flex-col border-b-4 border-blue-600'
			>
				<div 
				className='text-6xl text-white text-extrabold my-8'
				style={{fontVariant:'small-caps', lineHeight: 'initial'}}
				>
					Register Your CRO
				</div>

				<div>
					Help carry out experiments.
				
				</div>

				<div className='flex-1 flex flex-col'>
					<div className='flex flex-row'>

						<div 
						className='px-4 py-2 text-3xl text-bold text-gray-700 border border-white rounded bg-white bg-opacity-25 hover:bg-opacity-50 active:bg-opacity-75 cursor-pointer select-none mr-6 flex'
						>
							<span className='self-center'>Register CRO</span>
						</div>

					</div>
			
				</div>
			</div>
		</>
	)
}
export default RegisterCROCard

						// <div className='px-4 py-2 text-white border border-white rounded bg-white bg-opacity-100 hover:bg-opacity-50 active:bg-opacity-75 cursor-pointer select-none'>

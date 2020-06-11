import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { Button } from 'semantic-ui-react'

import svgNetwork from './images/network.svg'

				// backgroundImage: `url(${require('./images/image3.jpeg')})`,
				// backgroundSize: '50%',
				// backgroundPosition: '0, 0',

const BuildTheFutureCard = () => {
	return (
		<>
			<div 
			className='flex flex-col border-b-4 border-pink-600 relative'
			style={{
				backgroundImage: 'linear-gradient(to top right, #42e2ac, #4299e2)',
				height: '25rem',
			}}
			>
				<div 
				className='absolute h-full w-full'
				style={{
					backgroundImage: `url(${svgNetwork})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '140% 0%',
					backgroundSize: '50%',
					opacity: '30%',
					zIndex: '1',
				}}
				/>
				<div 
				className='absolute h-full w-full'
				style={{
					backgroundImage: `url(${svgNetwork})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '-10% -110%',
					backgroundSize: '30%',
					opacity: '20%',
					zIndex: '1',
				}}
				/>


				<div 
				className='flex-1 flex flex-col relative p-4'
				style={{ zIndex: '2' }}
				>
					<div className='flex-1 flex flex-row items-center'>
						<div 
						className='text-white flex flex-col leading-tight'
						style={{ textShadow: '0px 0px 1px gray' }}
						>
							<div 
							className='text-6xl text-extrabold'
							>
								Help Solve Important Problems.	
							</div>
							<div
							className='text-3xl text-extrabold'
							>
								Invent New Technologies & Approaches To #BuildTheFuture.
							</div>
						</div>
					</div>

					<div className='flex-1 flex flex-row items-center'>
						<div className='flex flex-row leading-tight'>
							<div 
							className='px-4 py-2 text-4xl text-bold text-white border border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer select-none mr-6 flex'
							>
								Browse Projects
							</div>

							<div 
							className='px-4 py-2 text-4xl text-bold text-white border border-green-600 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600 cursor-pointer select-none flex'
							>
								<span className='self-center'>Sponsor Research</span>
							</div>
						</div>
					</div>

				
				</div>

			</div>
		</>
	)
}
export default BuildTheFutureCard

						// <div className='px-4 py-2 text-white border border-white rounded bg-white bg-opacity-100 hover:bg-opacity-50 active:bg-opacity-75 cursor-pointer select-none'>

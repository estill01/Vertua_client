import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { Button } from 'semantic-ui-react'

import svgNetwork from './images/network.svg'

				// backgroundImage: `url(${require('./images/image3.jpeg')})`,
				// backgroundSize: '50%',
				// backgroundPosition: '0, 0',

const BuildTheFutureCard = () => {
	function handleClickSponsorResearch(e) {
		const el = document.getElementById('sponsor_research')
		el.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}

	return (
		<>
			<div 
			className='flex-1 flex flex-col relative' 
			style={{
				backgroundImage: 'linear-gradient(to top right, #42e2ac, #4299e2)',
				backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))',
				boxShadow: 'inset 0px -2px 2px #0000001a',
				minHeight: '10rem',
			}}
			>
				<div 
				className='absolute h-full w-full'
				style={{
					backgroundImage: `url(${svgNetwork})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '140% 0%',
					backgroundSize: '50%',
					opacity: '0.3',
					zIndex: '1',
				}}
				/>


				<div 
				className='flex-1 flex flex-col relative p-4'
				style={{ zIndex: '2' }}
				>
					<div className='flex-1 flex flex-row items-center'>

						<div 
						className='text-white flex flex-col leading-tight md:w-3/4 sm:w-full'
						>
							<span 
							className='font-black'
							style={{ 
								fontSize: 'calc(2.25rem + 0.8vw)',
								textShadow: '0px 0px 1.5px #787878'
							}}
							>
								The World's R&D Lab
							</span>
							<span 
							className='font-normal'
							style={{ 
								fontSize: 'calc(1.25rem + 0.8vw)',
								textShadow: '0px 0px 1.5px #787878'
							}}
							>
								Help Craft Projects & Approaches To #BuildTheFuture
							</span>
						</div>

					</div>

				</div>


			</div>
		</>
	)
}
export default BuildTheFutureCard

						// <div className='px-4 py-2 text-white border border-white rounded bg-white bg-opacity-100 hover:bg-opacity-50 active:bg-opacity-75 cursor-pointer select-none'>
						//
						//  
				// 	<div className='flex-1 flex flex-row items-center'>
				// 		<div className='flex flex-row leading-tight'>
				// 			<div 
				// 			className='px-4 py-2 text-bold text-white border border-blue-600 rounded-md bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer select-none mr-6 flex'
				// 			style={{
				// 				fontSize: 'calc(1.25em + 1vw)'
				// 			}}
        //
				// 			>
				// 				Browse Projects
				// 			</div>
        //
				// 			<div 
				// 			className='px-4 py-2  text-bold text-white border border-green-600 rounded-md bg-green-500 hover:bg-green-400 active:bg-green-600 cursor-pointer select-none flex'
				// 			style={{
				// 				fontSize: 'calc(1.25em + 1vw)'
				// 			}}
				// 			onClick={handleClickSponsorResearch}
				// 			>
				// 				<span className='self-center'>Sponsor Research</span>
				// 			</div>
				// 		</div>
				// 	</div>
				// </div>
        //

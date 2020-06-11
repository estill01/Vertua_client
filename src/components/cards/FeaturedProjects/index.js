import React, { lazy } from 'react'
import { Image } from 'semantic-ui-react'

const FeaturedProjectsCard = () => {
	return (
		<>
			<div 
			className='pb-4 flex flex-col'
			>
				<div className='text-3xl font-bold mt-6 px-4'>
					Featured Projects
				</div>


				<div className='relative '>

				<div
				className='w-12 h-full absolute left-0 top-0'
				style={{
					backgroundImage: 'linear-gradient(to right, white, white, transparent)',
					zIndex: '2',
				}}
				/>

					<div className='flex flex-col'>
						<div 
						className='inline-flex overflow-x-scroll pb-4 pt-6'
						style={{
							zIndex: '1',
						}}
						>
							<div
							style={{
								minWidth: '2.5rem',
								minHeight: '100%'
							}}/>

							<FeaturedProject name='Organ Engineering' img='./images/heart.jpeg' className='mr-6'/>
							<FeaturedProject name='Cybernetics' img='./images/cybernetics.jpg' className='mr-6'/>
							<FeaturedProject name='Black Lives Matter' img='./images/2000px-Fist.svg.png' className='mr-6'/>
							<FeaturedProject name='Global Warming' img='./images/global_warming.jpg' className='mr-6'/>
							<FeaturedProject name='Space Industrialization' img='./images/space_industrialization.jpg' className='mr-6'/>
							<FeaturedProject name='Crypto Systems' img='./images/crypto.jpg' className='mr-6'/>
							<FeaturedProject name='Anti-Aging' img='./images/genomics.webp' className='mr-6'/>
							<FeaturedProject name='Learning Systems' img='./images/ai.jpg' className='mr-6'/>
							<FeaturedProject name='Autonomous Drones' img='./images/drones.jpg'/>
							<div
							style={{
								minWidth: '2.5rem',
								minHeight: '100%'
							}}/>
						</div>
					</div>

				<div
				className='w-12 h-full absolute right-0 top-0'
				style={{
					backgroundImage: 'linear-gradient(to left, white, white, transparent)',
					zIndex: '2',
				}}
				/>

				</div>

			</div>
		</>
	)
}
export default FeaturedProjectsCard

const FeaturedProject = (props) => {
	const img = require(`${props.img}`)

	return (
		<>
			<div 
			className={`rounded-md cursor-pointer border-2 border-gray-300 hover:border-blue-300 active:border-blue-500 px-2 pt-2 rounded-md transform ease-linear duration-100 hover:scale-105 active:scale-100 shadow-md hover:shadow-lg active:shadow-none ${props.className}`}
			style={{minWidth:'14rem'}}
			>
				<img
				className='h-56 w-56 rounded-md select-none' 
				src={img}
				/>
				<div className='mt-2 pb-2 font-bold text-center'>
					{props.name}
				</div>
			</div>
		</>
	)
}

import React, { lazy } from 'react'
import { Image } from 'semantic-ui-react'

const FeaturedProjectsCard = () => {
	return (
		<>
			<div 
			className='px-4 pb-4 flex flex-col'
			>
				<div className='text-3xl font-bold my-6'>
					Featured Projects
				</div>
				<div className='inline-flex overflow-x-scroll '>
					<FeaturedProject name='Organ Engineering' img='./images/heart.jpeg' className='mr-6'/>
					<FeaturedProject name='Cybernetics' img='./images/cybernetics.jpg' className='mr-6'/>
					<FeaturedProject name='Black Lives Matter' img='./images/2000px-Fist.svg.png' className='mr-6'/>
					<FeaturedProject name='Global Warming' img='./images/global_warming.jpg' className='mr-6'/>
					<FeaturedProject name='Space Industrialization' img='./images/space_industrialization.jpg'/>
					<FeaturedProject name='Anti-Aging' img='./images/genomics.webp'/>
					<FeaturedProject name='Learning Systems' img='./images/ai.jpg'/>
					<FeaturedProject name='Autonomous Drones' img='./images/drones.jpg'/>
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
			className={`rounded-md cursor-pointer border-2 border-transparent hover:border-blue-400 p-2 rounded-md ${props.className}`}
			style={{minWidth:'14rem'}}
			>
				<img
				className='h-56 w-56 rounded-md border-gray-500' 
				src={img}
				/>
				<div className='mt-2 pb-2 font-bold text-center'>
					{props.name}
				</div>
			</div>
		</>
	)
}

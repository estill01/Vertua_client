import React, { lazy } from 'react'
import { Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const projects = [
	{
		name: 'Organ Engineering',
		img: './images/heart.jpeg',
		path: 'projects/organ_engineering',
	},
	{
		name: 'Cybernetics',
		img: './images/cybernetics.jpg',
		path: 'projects/cybernetics',
	},
	{
		name: 'Black Lives Matter',
		img: './images/2000px-Fist.svg.png',
		path: 'projects/black_lives_matter', 
	},
	{
		name: 'Global Warming',
		img: './images/global_warming.jpg',
		path: 'projects/global_warming',
	},
	{
		name: 'Space Industrialization',
		img: './images/space_industrialization.jpg',
		path: 'projects/space_industrialization', 
	},
	{
		name: 'Crypto Systems',
		img: './images/crypto.jpg',
		path: 'projects/crypto_systems', 
	},
	{
		name: 'Anti-Aging',
		img: './images/genomics.webp',
		path: 'projects/anti-aging',
	},
	{
		name: 'Learning Systems',
		img: './images/ai.jpg',
		path: 'projects/learning_systems',
	},
	{
		name: 'Autonomous Drones',
		img: './images/drones.jpg',
		path: 'projects/autonomous_drones',
	},
	{
		name: 'Space Elevator',
		img: './images/space_elevator.jpg',
		path: 'projects/space_elevator',
	}
]


const FeaturedProjectsCard = () => {
	return (
		<>
			<div 
			className='pb-4 flex flex-col'
			>
				<div className='mt-6 px-4'>
					<div className='text-3xl font-bold'>
						Featured Projects
					</div>
					<div className='text-lg text-gray-600 mt-2'>
						Find your way to contribute and help #BuildTheFuture.
					</div>

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

							{ projects.map((project, i) => {
								return (<FeaturedProject data={project} key={i} className='mr-6'/>)
							})}

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
	const img = require(`${props.data.img}`)
	const history = useHistory()

	function handleClick(e) {
		history.push(props.data.path)
		window.scrollTo(0,0)
	}

	return (
		<>
			<div 
			className={`rounded-md cursor-pointer select-none border-2 border-gray-300 hover:border-blue-300 active:border-blue-500 px-2 pt-2 rounded-md transform ease-linear duration-100 hover:scale-105 active:scale-100 shadow-md hover:shadow-lg active:shadow-none ${props.className}`}
			style={{minWidth:'14rem'}}
			onClick={handleClick}
			>
				<img
				className='h-56 w-56 rounded' 
				src={img}
				/>
				<div className='mt-2 pb-2 font-bold text-center'>
					{props.data.name}
				</div>
			</div>
		</>
	)
}

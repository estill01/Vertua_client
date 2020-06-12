import React, { useEffect } from 'react'
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
	const refContainer = React.createRef()
	return (
		<>
			<div className='pb-4 flex flex-col'>

				<div className='pt-6 px-4'>
					<div className='text-3xl font-bold'>
						Featured Projects
					</div>
					<div className='text-lg text-gray-600 mt-2'>
						Find your way to contribute and help #BuildTheFuture.
					</div>
				</div>

				<div className='flex flex-col'>
					<div 
					className='w-full h-full overflow-hidden relative'
					style={{
						height: '19.75rem',
					}}
					>

						<ScrollButton
						direction='left' 
						containerRef={refContainer} 
						className='absolute'
						style={{
							zIndex: 2,
							top: '40%',
							left: '1.5rem',
						}}
						/>

						<div 
						className='absolute top-0 left-0 right-0 inline-flex overflow-x-scroll py-6'
						style={{
							zIndex: 1,
							boxSizing: 'content-box',
							bottom: '-17px',
							height: '18rem',
						}}
						ref={refContainer}
						>
							<div style={{ minWidth: '2.5rem', minHeight: '100%' }}/>
							{ projects.map((project, i) => {
								return (<FeaturedProject data={project} key={i} className='mr-6'/>)
							})}
							<div style={{ minWidth: '2.5rem', minHeight: '100%' }}/>
						</div>
						
						<ScrollButton 
						direction='right' 
						containerRef={refContainer}
						className='absolute'
						style={{
							zIndex: 2,
							top: '40%',
							right: '1.5rem',
						}}
						/>

					</div>
				</div>

			</div>
		</>
	)
}
export default FeaturedProjectsCard


					// <div
					// className='mr-4 px-4 py-2 bg-gray-400 hover:bg-gray-300 active:bg-gray-500 rounded border border-gray-500 cursor-pointer select-none'
					// onClick={scrollLeft}
					// >
					// 	Scroll Left
					// </div>
					// <div
					// className='px-4 py-2 bg-gray-400 hover:bg-gray-300 active:bg-gray-500 rounded border border-gray-500 cursor-pointer select-none'
					// onClick={scrollRight}
					// >
					// 	Scroll Right
					// </div>
          //

const ScrollButton = (props) => {
	let scrollAmt = null
	let text = null
	let scrollWidth = null
	let segments = null
	// let scrollWidth = props.containerRef.current.scrollWidth
	// let segments = Math.floor(scrollWidth / Math.abs(scrollAmt))
	let currentSegment = 1

	let isVisible = true

	if (props.direction === 'left') {
		scrollAmt = -450
		text = '<'
	} 
	else {
		scrollAmt = 450 
		text = '>'
	}

	useEffect(() => {
		scrollWidth = props.containerRef.current.scrollWidth
		segments = Math.floor(scrollWidth / Math.abs(scrollAmt))

		console.log("[ScrollButton]")
		console.log("scrollAmt: ", scrollAmt)
		console.log("scrollWidth: ", scrollWidth)
		console.log("segments: ", segments)
		console.log("currentSegment: ", currentSegment)

		if (props.direction === 'left' && currentSegment > 1 ) { isVisible = true } else { isVisible = false }
		if (props.direction !== 'left' && currentSegment < segments ) { isVisible = true } else { isVisible = false }
	})


	function scroll() {
		props.containerRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth'})
		console.log("[scroll]")
		console.log("containerRef.scrollLeft: ", props.containerRef.current.scrollLeft)
	}

	return (
		<>
		{ isVisible && (
			<div
			className={`flex flex-row items-center w-16 h-16 rounded-full bg-white hover:bg-gray-100 active:bg-gray-200 border-2 border-gray-300 hover:border-blue-400 active:border-blue-500 text-3xl font-bold text-gray-500 hover:text-blue-400 shadow active:shadow-none cursor-pointer select-none ${props.className}`}
			style={props.style}
			onClick={scroll}
			>
				<span className='mx-auto'>{text}</span>
			</div>
		)}
		</>
	)

}
		// { ((props.direction === 'left' && currentSegment > 1) || (props.direction !== 'left' && currentSegment < segments)) && (


				// <div
				// className='w-12 h-full absolute left-0 top-0'
				// style={{
				// 	backgroundImage: 'linear-gradient(to right, white, white, transparent)',
				// 	zIndex: '2',
				// }}
				// />
        //
				// <div
				// className='w-12 h-full absolute right-0 top-0'
				// style={{
				// 	backgroundImage: 'linear-gradient(to left, white, white, transparent)',
				// 	zIndex: '2',
				// }}
				// />
        

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

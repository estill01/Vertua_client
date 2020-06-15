import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { CardHeader } from '../utils'


const products = [
	{
		name: "Ethan Stillman",
		img: "./images/unnamed.jpg",
		productURL: 'users/ethan_stillman',
	},
]



const FeaturedUsersCard = (props) => {
	return (
		<>
			<div
			className={`flex flex-col ${props.className}`}
			>
				<CardHeader 
				text='Featured Researchers'
				subText='Humans working to #BuildTheFuture.'
				/>
				<div className='h-46 pt-4 px-6'>
				{ products.map((product, i) => {
					return( <ProductItem data={product} key={i} className='mb-4'/>)
				})}
				</div>
			</div>
		</>
	)
}
export default FeaturedUsersCard

const ProductItem = (props) => {
	const history = useHistory()
	let refTitle = React.createRef()

	let img
	if (props.data.img !== '') { img = require(`${props.data.img}`) }

	function handleClick(e) {
		history.push(props.data.productURL)
		window.scrollTo(0,0)
	}
	function handleMouseEnter(e) {
		console.log("[handleMouseEnter]")
		console.log("refTitle: ", refTitle)
		refTitle.current.classList.add('text-blue-500')
	}
	function handleMouseLeave(e) {
		refTitle.current.classList.remove('text-blue-500')
	}

	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer p-2 border-gray-300 border-2 hover:border-blue-400 active:border-blue-500 rounded-md ${props.className}`}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			>
				<img 
				className='h-32 w-32 rounded bg-gray-300 border border-gray-400 mr-4'
				src={img}
				/>

				<div className='flex flex-col flex-1'>

					<div className='flex-1 flex flex-col pb-2'>
						<div className='flex flex-row items-center'>
							<div ref={refTitle} className='text-2xl mr-2 active:text-blue-400'>{props.data.name}</div>
						</div>
					</div>

				</div>

			</div>
		</>
	)
}

import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { CardHeader } from '../../utils'


const products = [
	{
		name: "At-Home Bioreactor",
		description: "Grow large-scale organs and bio-systems at-home from stem cells.",
		img: "./images/bioreactor.jpg",
		forSale: false,
		price: '$300',
		productURL: 'products/at-home_bioreactor',
	},
	{
		name: "DIY-Bio Stem Cell Kit",
		description: "Make stem cells at home. Instructions included.",
		img: "./images/stem-cell.jpg",
		forSale: true,
		price: '$250',
		productURL: 'products/diy-bio_stem_cell_kit',
	},
	{
		name: "At-Home Bio Lab - Delux Edition",
		description: "All the tools you need to do cutting edge biowork at-home.",
		img: "./images/delux-kit.webp",
		forSale: true,
		price: '$800',
		productURL: 'products/at-home_bio_lab-delux_edition',
	},
	{
		name: "At-Home Bio Lab - Starter Edition",
		description: "All the basic tools you need to get started doing biowork at-home.",
		img: "./images/starter-kit.png",
		forSale: true,
		price: '$300',
		productURL: 'products/at-home_bio_lab-starter_edition',
	},
	{
		name: "Cybernetic Armband",
		description: "Connect your peripheral nervous system to digital computing systems.",
		img: "./images/explantcutaway2.jpg",
		forSale: false,
		price: '$200',
		productURL: 'products/at-home_bio_lab-starter_edition',
	},


]



const CommunityProductsCard = (props) => {
	return (
		<>
			<div
			className={`flex flex-col ${props.className}`}
			>
				<CardHeader 
				text='Products Developed By The Community'
				subText='Tools to help you better #BuildTheFuture.'
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
export default CommunityProductsCard

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

							<Label tag>
								<div className='text-gray-600 text-xl text-extrabold'>
									{props.data.price}
								</div>
							</Label>

						</div>

						<div className='flex-1 text-gray-800 mt-1'>
							{props.data.description}
						</div>
					</div>

					<div className='flex flex-row items-center'>
						<div>
							<PurchaseButton data={props.data}/>
						</div>
					</div>
				</div>

			</div>
		</>
	)
}

						// <div className='text-blue-400 hover:text-blue-300 active:text-blue-500 ml-2 cursor-pointer select-none'>
						// 	Save For Later
						// </div>



const PurchaseButton = (props) => {
	let colors = null
	let text = null
	if (props.data.forSale) {
		colors = ' bg-orange-400 hover:bg-orange-300 active:bg-orange-500 border border-yellow-500 hover:border-yellow-400 active:border-yellow-600 ' 
		text = 'Add To Cart'
	} else {
		colors = 'bg-pink-500 hover:bg-pink-400 active:bg-pink-600 border border-pink-400 hover:border-pink-300 active:border-pink-500'
		text = 'Pre-Order Now'
	}

	function handleClick(e) {
		console.log("[PurchaseButton.handleClick]")
		e.stopPropagation()
	}


	return (
		<>
			<div 
			className={`flex flex-row px-4 py-2 box rounded-md text-white cursor-pointer select-none ${colors}`}
			onClick={handleClick}
			>
				<Icon name='cart'/>
				<div className='ml-2'>
					{text}
				</div>
			</div>
		</>

	)
}


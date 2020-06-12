import React from 'react'
import { Icon } from 'semantic-ui-react'


const products = [
	{
		name: "At-Home Bioreactor",
		description: "Grow large-scale organs and bio-systems at-home from stem cells.",
		img: "",
		forSale: false,
	},
	{
		name: "DIY-Bio Stem Cell Kit",
		description: "Make stem cells at home",
		img: "",
		forSale: true,
	},
	{
		name: "At-Home Bio Lab - Delux Edition",
		description: "All the tools you need to do cutting edge biowork at-home.",
		img: "",
		forSale: true,
	},
	{
		name: "At-Home Bio Lab - Starter Edition",
		description: "All the basic tools you need to get started doing biowork at-home.",
		img: "",
		forSale: true,
	},

]



const CommunityProductsCard = (props) => {
	return (
		<>
			<div
			className={`flex flex-col ${props.className}`}
			>
				<div className='text-3xl font-bold py-6 px-4'>
					Community-Developed Products 
				</div>
				<div className='h-46 pt-4 px-6'>
				{ products.map((product, i) => {
					return( <Product data={product} key={i} className='mb-4'/>)
				})}
				</div>
			</div>
		</>
	)
}

export default CommunityProductsCard

const Product = (props) => {
	return (
		<>
			<div className={`flex flex-row ${props.className}`}>
				<div className='h-32 w-32 rounded-md bg-gray-300 border border-gray-400 mr-4'/>

				<div className='flex flex-col flex-1'>

					<div className='flex-1 flex flex-col py-2'>
						<div className='text-2xl'>{props.data.name}</div>
						<div className='flex-1 text-gray-800 mt-1'>
							{props.data.description}
						</div>
					</div>

					<div className='flex'>
						{props.data.forSale && (<BuyButton/>)}
						{!props.data.forSale && (<PreOrderButton/>)}
						<div className='flex-1'/>
					</div>
				</div>

			</div>
		</>
	)
}

const BuyButton = (props) => {
	return (
		<>
			<div className='flex flex-row px-4 py-2 box rounded-md bg-orange-400 hover:bg-orange-300 active:bg-orange-500 border border-yellow-500 hover:border-yellow-400 active:border-yellow-600 text-white cursor-pointer select-none'>
				<Icon name='cart'/>
				<div className='ml-2'>
					Add To Cart
				</div>
			</div>
		</>
	)
}

const PreOrderButton = (props) => {
	return (
		<>
			<div className='flex flex-row px-4 py-2 box rounded-md bg-pink-500 hover:bg-pink-400 active:bg-pink-600 border border-pink-400 hover:border-pink-300 active:border-pink-500 text-white cursor-pointer select-none'>
				<Icon name='cart'/>
				<div className='ml-2'>
					Pre-Order Now
				</div>
			</div>
		</>
	)
}

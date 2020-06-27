import React from 'react'
import { Menu, Image } from 'semantic-ui-react'

// import { ReactComponent as Logo } from '../../../assets/images/logo/noun_Network_1305442.svg'
// import { ReactComponent as Logo } from '../../../assets/images/logo/noun_networking_2362699.svg'

// import { ReactComponent as Logo } from '../../../assets/images/logo/thunder.svg'
// import { ReactComponent as Logo } from '../../../assets/images/logo/miscellaneous.svg' // GOOD
import { ReactComponent as Logo } from '../../../assets/images/logo/flash (1).svg'

// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_fast_3119713.svg'  
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_fractal_224058.svg' 
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_labyrinth_3202515.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Maze_2871969.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_networking_2362654.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Tree_2858891.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Network_2818262.svg' //circle dots

// import {  ReactComponent as Logo } from '../../assets/images/logo/circle_dots.jpg'


// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_networking_2362668.svg'

// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_create_1875577.svg'

// import { ReactComponent as Logo } from '../../assets/images/logo/noun_Christmas tree_782938.svg'
// Created by Daniela Baptista
// from the Noun Project

// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_build_83813.svg'
//Created by Stephen Plaster
// from the Noun Project


// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_DIY_1953984.svg'
// DIY by Timofey Rostilov from the Noun Project
// from the Noun Project



// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_bulb_1695066.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Idea_623333.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Light Bulb_16898.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_DIY_1953984.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_DIY_1953984.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_DIY_1953984.svg'
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_DIY_1953984.svg'

// import { ReactComponent as Logo } from '../../../assets/images/logo/circle_dots@2x.svg'

// # Glyph Based on:
// https://looka.com/editor/47519277
// plus:
// import {  ReactComponent as Logo } from '../../assets/images/logo/noun_Network_2818262.svg' //circle dots
// TODO:
// Run whole thing through 99Designs / get a finalized version in order


const LogoGlyph = (props) => (					
	<>
		<div 
		className={`bg-white ${props.className}`}
		>
			<Logo className='h-10 w-10'/>
		</div>
	</>
)
		// style={{
		// 	backgroundColor:'white',
		// 	backgroundImage: 'linear-gradient(to bottom right, #42e2ac, #4299e2)'
		// }}

			// <Logo {...props} style={{fill:'white'}}/>

export default LogoGlyph

		// <Image 
		// src={require('../../../assets/images/logo/circle_dots.jpg')} 
		// size='mini'
		// className='rotate-180'
		// style={{transform: 'rotate(180deg)'}}
		// />



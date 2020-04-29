import React from 'react'
import { MenuToggle } from '../menus/utils'
import LanguageSelector from '../language_selector'
import { Link } from 'react-router-dom'

const SuperBar = ({ props } ) => (
	<>
		<div className='w-full p-4 bg-primary flex flex-row items-center' { ...props }>
			<MenuToggle/>
			<div className='text-primary text-lg font-logo-bold'>Vertua</div>
			<div className='flex flex-1 flex-row'>
				<Link to='/'>Home</Link>
				<Link to='/account'>Account</Link>
			</div>
			<LanguageSelector/>
		</div>
	</>
)

export default SuperBar



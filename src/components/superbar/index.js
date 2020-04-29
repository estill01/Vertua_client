import React from 'react'
import { MenuToggle } from '../menus/utils'
import LanguageSelector from '../language_selector'

const SuperBar = ({ props } ) => (
	<>
		<div className='w-full p-4 bg-primary flex flex-row items-center' { ...props }>
			<MenuToggle/>
			<div className='text-primary text-lg font-logo-bold'>Vertua</div>
			<div className='flex flex-1'/>
			<LanguageSelector/>
		</div>
	</>
)

export default SuperBar



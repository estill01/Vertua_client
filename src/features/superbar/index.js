import React from 'react'
import LanguageSelector from '../language_selector'


const SuperBar = ({ props } ) => (
	<>
		<div className='w-full p-4 bg-primary flex flex-row items-center' { ...props }>
			<div className='text-primary text-lg font-logo-bold'>Vertua</div>
			<div className='flex flex-1'/>
			<LanguageSelector/>
		</div>
	</>
)

export default SuperBar



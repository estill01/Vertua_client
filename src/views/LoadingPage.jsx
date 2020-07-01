import React from 'react'
import { Loader } from 'semantic-ui-react'
import LogoGlyph from '../components/utils/LogoGlyph'

export const LoadingPage = () => {
	return (
		<div 
		className='h-screen w-screen flex flex-row items-center fixed top-0 left-0' 
		style={{ 
			backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))',
			zIndex: 10000,
		}}
		>
			<div className='mx-auto'>
				<LogoGlyph className='h-64 w-64 opacity-50'/>
				<Loader active inverted size='big'content='Loading'/>
			</div>
		</div>
	)
}

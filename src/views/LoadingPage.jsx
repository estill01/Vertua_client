import React from 'react'
import { Loader } from 'semantic-ui-react'
import { LogoGlyph, Logo } from '../components/utils/LogoGlyph'
import { ZINDEX } from '../components/utils'

export const LoadingPage = () => {
	return (
		<div 
		className='h-screen w-screen flex flex-row items-center fixed top-0 left-0' 
		style={{ 
			backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))',
			zIndex: ZINDEX.loadingPage,
		}}
		>
			<div className='mx-auto'>
				<div>
					<LogoGlyph 
					className='h-64 w-64 opacity-75'
					style={{
						boxShadow: '4px 4px 4px #2e2e2e52',
						borderRadius: '32px'
					}}
					/>
					<Logo 
					light
					className='mt-8 select-none h-14'
					/>
				</div>
				<Loader 
				active 
				inverted 
				size='big'
				style={{
					marginTop: '-1rem'
				}}
				/>
			</div>
		</div>
	)
}


					// <div 
					// className='text-5xl font-logo font-bold italic text-center mt-8 text-white select-none'
					// style={{
					// 	textShadow: '1px 1px 1px #ba6c1170'
					// }}
					// >
					// 	Vertua
					// </div>
          //

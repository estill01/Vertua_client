import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { CardHeader } from '../utils'
import { ReactComponent as FundSVG } from './images/noun_funding_2714872.svg'
import { ReactComponent as ResearchSVG } from './images/noun_Science_3155785.svg'
import { ReactComponent as PatentSVG } from './images/noun_Patent_582626.svg'
import { ReactComponent as LicenseSVG } from './images/noun_Share_3067035.svg'
import { ReactComponent as EarningsSVG } from './images/noun_Profit_1663674.svg'
import { Icon } from 'semantic-ui-react'


					// subText='Advance causes you believe in and share any IP produced as a result.'
const SponsorResearchCard = () => {
	return (
		<>
			<div 
			style={{
				backgroundImage: `url(${require('./images/image.jpeg')})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'none',
				// backgroundImage: 'linear-gradient(to bottom right, yellow, orange'
			}}
			className='h-auto text-white relative'
			id='sponsor_research'
			>
				<div 
				className='absolute top-0 left-0 w-full h-full'
				style={{
					backgroundImage: 'linear-gradient(to right, black, transparent)',
					zIndex: 1,
				}}
				/>

				<div 
				className='relative h-full w-full'
				style={{ zIndex: 2 }}
				>
					<CardHeader
					text='Become A Research Sponsor'
					subText='Fund researchers and R&D and share earnings produced as a result.'
					textColor='text-white'
					subTextColor='text-gray-300'
					/>

					<Content/>
			
				</div>
			</div>
		</>
	)
} 
export default SponsorResearchCard



const Content = (props) => {
	const refSignUp = React.createRef()

	function handleClickSignUp(e) {
		refSignUp.current.value = ''

	}
	return (
		<>
			<div className='p-4 h-auto relative'>


					<div className='h-full w-full flex flex-row'>

						<div className='flex flex-col w-40 rounded mr-6 '>
							<ResearchSVG className='flex flex-1 self-center'/>
						</div>

						<div className='flex flex-col text-xl p-4'>

							<div className='mb-4'>
								<span 
								className='font-black text-3xl mr-2'
								style={{
									fontVariant: 'small-caps'
								}}
								>
									fund
								</span>
								<span className='text-gray-200'>Back promising researchers, projects, or areas of study.</span>
							</div>

							<div className='mb-4'>
								<span 
								className='font-black text-3xl mr-2'
								style={{
									fontVariant: 'small-caps'
								}}
								>
									create
								</span>
								<span className='text-gray-200'>Researchers advance projects toward development of IP or products.</span>
							</div>
						

							<div className='mb-4'>
								<span 
								className='font-black text-3xl mr-2'
								style={{
									fontVariant: 'small-caps'
								}}
								>
									earn
								</span>
								<span className='text-gray-200'>Value derived from projects which yield IP or products is shared amongst the projects' funders and researchers.</span>
							</div>


							<div className='flex flex-row bg-white items-center rounded pl-2'>
								<Icon name='mail outline' color='grey' fitted className='h-8 w-8'/>
								<input 
								type='email' 
								placeholder='Email'
								className='ml-2 flex-1 rounded text-gray-800'
								style={{
									outline: 'none'
								}}
								ref={refSignUp}
								/>
								<div 
								className='p-2 bg-blue-500 rounded-r border border-blue-600 text-white hover:bg-blue-400 active:bg-blue-600 cursor-pointer select-none text-md w-auto'
								onClick={handleClickSignUp}
								>
									Sign Up
								</div>
							</div>

						</div>
					</div>

			</div>

		</>
	)
}




const SponsoredResearchDiagram = (props) => {
	return (
		<>
			<div className='m-4 p-4 rounded-md h-auto relative'>
				<div 
				className='h-full w-full absolute top-0 left-0 bg-white rounded-md'
				style={{
					opacity: '0.5',
					zIndex: '1',
				}}
				/>
				<div 
				className='relative p-4'
				style={{
					zIndex: '2'
				}}
				>

					<div className='h-full w-full flex flex-row'>

						<div className='flex flex-col w-32 bg-blue-400 rounded mr-6 '>
							<FundSVG className='flex flex-1 self-center'/>
							<span className='mx-auto'>Research Sponsored</span>
						</div>

						<div className='flex flex-col w-32 bg-blue-400 rounded mr-6 '>
							<ResearchSVG className='flex flex-1 self-center'/>
							<span className='mx-auto'>R&D Work</span>
						</div>


						<div className='flex flex-col w-32 bg-blue-400 rounded mr-6 '>
							<PatentSVG className='flex flex-1 self-center'/>
							<span className='mx-auto'>IP Filed</span>
						</div>

						<div className='flex flex-col w-32 bg-blue-400 rounded mr-6 '>
							<LicenseSVG className='flex flex-1 self-center'/>
							<span className='mx-auto'>IP Licensed</span>
						</div>

						<div className='flex flex-col w-32 bg-blue-400 rounded mr-6 '>
							<EarningsSVG className='flex flex-1 self-center'/>
							<span className='mx-auto'>Earnings Shared</span>
						</div>

					</div>

				</div>
			</div>

		</>
	)
}

const EmailSignupForm = (props) => {
	return (
		<>
			<div className='m-4 p-4 rounded-md h-40 relative'>
				<div 
				className='h-full w-full absolute top-0 left-0 bg-white rounded-md'
				style={{
					opacity: '0.5',
					zIndex: '1',
				}}
				/>
				<div 
				className='relative p-4'
				style={{
					zIndex: '2'
				}}
				>
					<input type='text' placeholder='Sign up' />
				</div>
			</div>
		</>
	)
}

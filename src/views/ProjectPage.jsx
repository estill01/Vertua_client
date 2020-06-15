import React from 'react'
import PageErrorBoundary from './PageErrorBoundary'

import { useStore, useSelector, useDispatch } from 'react-redux'

const ProjectPage = () => {
	const store = useStore()
	const item = store.getState().items.current

	// TODO production implementation
	// const image = require(`${item.img}`) // right; this will be a url or otherwise an image sent down the wire.
  const image = require('./images_tmp/cybernetics.jpg')	



	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>

					<div className='flex flex-row p-4 rounded-md shadow border border-gray-400'>
						<div className='w-56 h-56 rounded-md'>
							<img src={image} className='rounded-md h-full w-full'/>
						</div>
						<div className='flex flex-col p-4'>
							<div className='text-4xl font-extrabold'>Cybernetics</div>
							<div className='flex-1'/>
						</div>
					</div>

				</div>
			</PageErrorBoundary>
		</>
	)
}

export default ProjectPage 

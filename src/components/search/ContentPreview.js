import React from 'react'
import { useSelector } from 'react-redux'


export const ContentPreview = (props) => {
	const previewItem = useSelector(state => state.items.previewItem )
	const hasPreviewItem = useSelector(state => state.items.hasPreviewItem )

	return (
		<>
			<div className={props.className}>
				<div className='bg-primary flex flex-col lg:p-2'>
					<>
					{ hasPreviewItem && (<div className='text-lg font-bold'>{previewItem.name || previewItem.displayName}</div>) }
					</>
					<>
					{ hasPreviewItem && (<div className='text-md'>{previewItem.urlSlug}</div>) }
					</>
			
				</div>
			</div>
		</>
	)
}

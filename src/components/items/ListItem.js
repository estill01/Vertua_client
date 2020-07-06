import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isNil, startCase } from 'lodash'
import { handleItemClick } from '../../app/utils'
import { UserAvatar } from '../utils/UserAvatar'
import { icon } from '../utils/icons.js'
import { setPreviewItem, clearPreviewItem } from '../../app/slices/ItemsSlice.js'


export const ListItem = (props) => {
	const history = useHistory()
	const refItem = React.createRef()
	const refAvatar = React.createRef()
	const refName = React.createRef()
	const refDetails = React.createRef()
	const dispatch = useDispatch()

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}
	function handleMouseEnter(e) {
		console.log("[ListItem.MouseEnter]")
		toggleStylesOn()
		dispatch(setPreviewItem(props.data))
	}
	function handleMouseLeave(e) {
		console.log("[ListItem.MouseLeave]")
		toggleStylesOff()
		// dispatch(clearPreviewItem())
	}
	function toggleStylesOn() { refItem.current.classList.add('border-blue-500') }
	function toggleStylesOff() { refItem.current.classList.remove('border-blue-500') }
	function toggleTextStylesOn() { refName.current.classList.add('text-blue-600') }
	function toggleTextStylesOff() { refName.current.classList.remove('text-blue-600') }

	return (
		<>
			<div 
			className={`flex flex-row cursor-pointer border border-gray-400 rounded p-2 shadow-sm ${props.className}`}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={refItem}
			>
				<ListItemAvatar ref={refAvatar} type={props.type} data={props.data}/>
				<div className='flex flex-col truncate'>
					<ListItemName 
					ref={refName} 
					type={props.type} 
					data={props.data}
					/>

					<div className='flex flex-row truncate'>
						<ListItemDetails 
						ref={refDetails} 
						type={props.type} 
						data={props.data} 
						toggleStylesOn={toggleTextStylesOn}
						toggleStylesOff={toggleTextStylesOff}
						/>
					</div>

				</div>
			</div>
		</>
	)
}


const ListItemAvatar = React.forwardRef((props, ref) => {
	const hasAvatar = !isNil(props.data.photoURL) && props.data.photoURL !== ''

	return (
		<div 
		className='flex mr-2'
		style={{ 
			width: '3.5rem',
			minWidth: '3.5rem',
			maxWidth: '3.5rem',
			height: '3.5rem',
			minHeight: '3.5rem',
			maxHeight: '3.5rem',
		}}
		>
			<div 
			className='flex-1 rounded border border-gray-400'
			style={{
				backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))'
			}}
			ref={ref}
			>
				<div className='w-full h-full rounded flex items-center'>
				 	{ hasAvatar && (<img src={props.data.photoURL} className='w-full h-full rounded'/>) }
			  	{ !hasAvatar && icon(props.type, 'h-6 w-6 mx-auto')}
				</div>
			</div>
		</div>
	)
})

const ListItemName = React.forwardRef((props, ref) => {
	return (
		<div 
		className='flex-1 font-semibold text-xl truncate text-blue-600'
		style={{
			minWidth: '0%',
		}}
		onMouseEnter={props.onMouseEnter}
		onMouseLeave={props.onMouseLeave}
		ref={ref}
		>
			{props.type !== 'users' && props.data.name}
			{props.type === 'users' && props.data.displayName}
		</div>
	)
})


const ListItemDetails = React.forwardRef((props, ref) => {
	return (
		<>
			{ props.type === 'users' && <ItemStats data={props.data}/> }
			{ props.type !== 'users' && (
			<ItemCreator 
			data={props.data} 
			toggleStylesOn={props.toggleStylesOn}
			toggleStylesOff={props.toggleStylesOff}
			/> 
			)}
			
		</>
	)
})


const ItemCreator = (props) => {
	const refName = React.createRef()
	const refAvatar = React.createRef()
	const history = useHistory()
	const dispatch = useDispatch()

	// TODO add a safty existence check for props.data.creator (?)

	function handleMouseEnter(e) { 
		console.log("[ItemCreator.MouseEnter]")
		dispatch(setPreviewItem(props.data.creator))
		refName.current.classList.remove('text-gray-700')
		refName.current.classList.add('text-blue-600')
		// props.refName.current.classList.remove('text-blue-600')
		props.toggleStylesOff()
	}
	function handleMouseLeave(e) {
		console.log("[ItemCreator.MouseLeave]")
		refName.current.classList.remove('text-blue-600')
		refName.current.classList.add('text-gray-700')
		props.toggleStylesOn()
	}
	function handleClick(e) {
		e.stopPropagation()
		handleItemClick(props.data.creator)
		history.push(props.data.creator.urlSlug)
	}

	return (
		<div>
			<div 
			className='flex flex-row items-center truncate text-gray-700'
			ref={refName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			>
				<div ref={refAvatar} className='border border-transparent rounded-sm'>
					<UserAvatar data={props.data.creator} className='rounded-full h-6 w-6 flex-none'/> 
				</div>
				<div 
				className='ml-1 text-sm font-semibold'
				>
					{props.data.creator.displayName}
				</div>
			</div>
		</div>
	)
}

const ItemStats = (props) => {
	let date = new Date(props.data.createdAt)
	return (
		<div className='truncate'>
			Joined: { date.toString() }
		</div>
	)
}
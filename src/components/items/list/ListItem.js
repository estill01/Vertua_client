import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isNil, startCase } from 'lodash'
import { UserAvatar } from '../../utils/UserAvatar'
import { icon } from '../../utils'
import { setPreviewItem, clearPreviewItem } from '../../../app/slices/ItemsSlice.js'
import { handleItemClick, TYPES } from '../../../app/utils'


export const ListItem = (props) => {
	const history = useHistory()
	const refItem = React.createRef()
	const refAvatar = React.createRef()
	const refName = React.createRef()
	const refDetails = React.createRef()
	const dispatch = useDispatch()

	console.log("[ListItem.madeBy] -- ", props.madeBy)

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}
	function handleMouseEnter(e) {
		console.log("[ListItem.MouseEnter]")
		console.log('props.data: ', props.data)
		toggleStylesOn()
		if (props.previewItem) {
			dispatch(setPreviewItem(props.data))
		}
	}
	function handleMouseLeave(e) {
		console.log("[ListItem.MouseLeave]")
		toggleStylesOff()
	}
	function toggleStylesOn() { refItem.current.classList.add('border-blue-500') }
	function toggleStylesOff() { refItem.current.classList.remove('border-blue-500') }
	function toggleTextStylesOn() { refName.current.classList.add('text-blue-600') }
	function toggleTextStylesOff() { refName.current.classList.remove('text-blue-600') }

	return (
		<>
			<div 
			className={`bg-primary flex flex-row cursor-pointer border border-gray-400 rounded p-2 shadow-sm ${props.className}`}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={refItem}
			>
				<ListItemAvatar ref={refAvatar} type={props.type} data={props.data}/>
				<div className='flex flex-col truncate'>
					<ListItemName 
					ref={refName} 
					data={props.data}
					className='font-semibold text-xl'
					/>

					<div className='flex flex-row truncate'>
						<ListItemDetails 
						ref={refDetails} 
						type={props.type} 
						data={props.data} 
						toggleParentStylesOn={toggleTextStylesOn}
						toggleParentStylesOff={toggleTextStylesOff}
						madeBy={props.madeBy}
						previewItem={props.previewItem}
						/>
					</div>

				</div>
			</div>
		</>
	)
}

export const ListItemMini = (props) => {
	const history = useHistory()

	function handleClick(e) {
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	return (
		<>
			<div
			className={`flex flex-row items-center cursor-pointer ${props.className}`}
			onClick={handleClick}
			>
				<ListItemAvatar type={props.type} data={props.data} size='mini'/>
				<ListItemName data={props.data} className='font-normal text-lg'/>
			</div>
		</>
	)
}


export const ListItemAvatar = React.forwardRef((props, ref) => {
	const hasAvatar = !isNil(props.data.photoURL) && props.data.photoURL !== ''

	const size = {
		item: {
			default: {
				width: '3.5rem',
				minWidth: '3.5rem',
				maxWidth: '3.5rem',
				height: '3.5rem',
				minHeight: '3.5rem',
				maxHeight: '3.5rem',
			},
			mini: {
				width: '1.5rem',
				minWidth: '1.5rem',
				maxWidth: '1.5rem',
				height: '1.5rem',
				minHeight: '1.5rem',
				maxHeight: '1.5rem',
			},
		},
		icon: {
			default: 'h-6 w-6',
			mini: 'h-4 w-4',
		},
	}

	return (
		<div 
		className='flex mr-2'
		style={size.item[props.size] || size.item.default}
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
			  	{ !hasAvatar && icon(props.type, `${size.icon[props.size] || size.icon.default} mx-auto`)}
				</div>
			</div>
		</div>
	)
})

export const ListItemName = React.forwardRef((props, ref) => {
	return (
		<div 
		className={`flex-1 truncate text-blue-600 ${props.className}`}
		style={{
			minWidth: '0%',
		}}
		onMouseEnter={props.onMouseEnter}
		onMouseLeave={props.onMouseLeave}
		ref={ref}
		>
			{ props.data.name || props.data.displayName }
		</div>
	)
})


export const ListItemDetails = React.forwardRef((props, ref) => {

	function handleMouseEnter() {
		props.toggleParentStylesOff()
	}
	function handleMouseLeave() {
		props.toggleParentStylesOn()
	}

	return (
		<>
			{ (props.type === TYPES.users || props.madeBy === false) && (<ItemStats data={props.data}/>) }
			{ ((props.type !== TYPES.users && props.madeBy === undefined ) || props.madeBy === true) && (
			<ItemMadeBy
			data={props.data.creator} 
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			previewItem={props.previewItem}
			/> 
			)}
			
		</>
	)
})


export const ItemMadeBy = (props) => {
	const refName = React.createRef()
	const refAvatar = React.createRef()
	const history = useHistory()
	const dispatch = useDispatch()

	function handleMouseEnter(e) { 
		refName.current.classList.remove('text-gray-700')
		refName.current.classList.add('text-blue-600')
		if (!isNil(props.onMouseEnter)) { props.onMouseEnter() }
		if (props.previewItem) { dispatch(setPreviewItem(props.data))}
	}
	function handleMouseLeave(e) {
		refName.current.classList.remove('text-blue-600')
		refName.current.classList.add('text-gray-700')
		if (!isNil(props.onMouseLeave)) { props.onMouseLeave() }
	}
	function handleClick(e) {
		e.stopPropagation()
		handleItemClick(props.data)
		history.push(props.data.urlSlug)
	}

	return (
		<div>
			<div 
			className='flex flex-row items-center truncate text-gray-700 cursor-pointer'
			ref={refName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			>
				<div ref={refAvatar} className='border border-transparent rounded-sm'>
					<UserAvatar data={props.data} className='rounded-full h-6 w-6 flex-none'/> 
				</div>
				<div 
				className='ml-1 text-sm font-semibold'
				>
					{props.data.displayName}
				</div>
			</div>
		</div>
	)
}

const ItemStats = (props) => {
	let date = new Date(props.data.createdAt)
	let word = null
	if (props.type === TYPES.users ) { word = 'Joined' }
	else { word = 'Created' }
	return (
		<div className='truncate'>
			{word}: { date.toString() }
		</div>
	)
}

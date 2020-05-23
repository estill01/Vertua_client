import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuToggle } from '../../menus/utils'
import { Link } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../../buttons/account'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import LogoGlyph from '../../utils/LogoGlyph'

import { ReactComponent as Avatar } from '../../../assets/images/avatar/noun_User_2187511.svg'

import { toggle } from '../../../app/slices/PageSlice'

					

export const InputBar = (props) => {
	let containerRef = React.createRef()
	let dispatch = useDispatch()

	function focusContainer() {
		containerRef.current.classList.add('border-blue-500')
		dispatch(toggle('dimmer'))
		dispatch(toggle('searchDropdown'))
	}
	function blurContainer() {
		containerRef.current.classList.remove('border-blue-500')
		dispatch(toggle('dimmer'))
		dispatch(toggle('searchDropdown'))
	}

	// when you start typing open the DropDown
	
	return (
		<div {...props}>
			<div 
			className="p-2 bg-white rounded border border-gray-400 hover:border-blue-400 flex flex-row flex-1"
			ref={containerRef}
			>
				<Icon name='search mr-2'/>
				<input 
				className='flex-1'
				style={{ outline: 'none' }} 
				onFocus={() => focusContainer()}
				onBlur={() => blurContainer()}
				/>
			</div>
		</div>
	)
}

export const DropDown = (props) => {
	let isVisible = useSelector(state => state.page.searchDropdown)
	return (
		<>
		{ isVisible && (
			<div className={`absolute w-full mx-auto pt-3 ${props.className}`} >
				<div 
				className='w-4/5 rounded border border-gray-400 mx-auto bg-secondary flex flex-col' 
				style={{ minHeight: '20em'}}
				>
					<div className='flex-1 p-4'>
						<span style={{fontVariant:'small-caps'}}>projects</span>
						<div className='flex flex-row'>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
							<div className='h-15 w-16 flex flex-none bg-blue-700 rounded mr-2 cursor-pointer'/>
						</div>
					</div>

					<div className='flex-1 p-4'>
						<span style={{fontVariant:'small-caps'}}>experiments</span>
						<div className='flex flex-row'>
							<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
						</div>

					</div>

					<div className='flex-1 p-4'>
						<span style={{fontVariant:'small-caps'}}>protocols</span>
						<div className='flex flex-row'>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
							<div className='h-16 w-16 flex flex-none bg-yellow-700 rounded mr-2 cursor-pointer'/>
						</div>

					</div>
					<hr/>
					<div className='p-4'>
					</div>
				</div>
			</div>
			)}
		</>
	)
}







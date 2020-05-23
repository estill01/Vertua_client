import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuToggle } from '../../menus/utils'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../../buttons/account'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import LogoGlyph from '../../utils/LogoGlyph'
import { ReactComponent as Avatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { toggle } from '../../../app/slices/PageSlice'

					

export const InputBar = (props) => {
	let containerRef = React.createRef()
	let inputRef = React.createRef()
	let dispatch = useDispatch()
	let history = useHistory()
	let isDropDownVisible = useSelector(state => state.page.searchDropdown)
	const [hasInput, toggleHasInput] = useState(false)

	function focusContainer() {
		containerRef.current.classList.add('border-blue-500')
	}
	function blurContainer() {
		containerRef.current.classList.remove('border-blue-500')
	}
	function handleInput(e) {
		if (inputRef.current.value === '') {
			if (isDropDownVisible) {
				dispatch(toggle('dimmer'))
				dispatch(toggle('searchDropdown'))
			}
			toggleHasInput(false)
		} else {
			toggleHasInput(true)
			if (!isDropDownVisible) {
				dispatch(toggle('dimmer'))
				dispatch(toggle('searchDropdown'))
			}
		}
	}
	function handleKeyPress(e) {
		if (e.charCode === 13) {
			let query = encodeURIComponent(inputRef.current.value.trim())
			// TODO Integrate search client and fetch data

			if (isDropDownVisible) {
				dispatch(toggle('dimmer'))
				dispatch(toggle('searchDropdown'))
			}
			history.push({
				pathname: '/search',
				search: `?query=${query}`,
			})
		}
	}


	// TODO If click on the dimmer when search dropdown is showing, hide search dropdown.

	return (
		<div 
		className={`bg-secondary text-primary rounded border border-gray-400 hover:border-blue-400 flex flex-row items-center ${props.className}`}
		ref={containerRef}
		>
			<div className='p-2 flex flex-row flex-1 items-center'>
				<Icon name='search mr-2' style={{marginTop:'-0.125em'}}/>
				<input 
				className='flex-1 text-xl'
				ref={inputRef}
				style={{ outline: 'none' }} 
				onFocus={() => focusContainer()}
				onBlur={() => blurContainer()}
				onInput={() => handleInput()}
				onKeyPress={(e) => handleKeyPress(e)}
				/>
			</div>
			<div className='p-1'>
				{ hasInput && (<EnterIndicator className='ml-2 mr-1'/>) }
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
					<div className='p-4 flex flex-row bg-primary'>
						<Link to='/search' style={{fontVariant:'small-caps'}}>
							more results 
						</Link>
						<EnterIndicator className='ml-2'/>
					</div>
				</div>
			</div>
			)}
		</>
	)
}

const EnterIndicator = (props) => {
	return (
		<div className={`bg-secondary px-1 py-px border border-gray-300 rounded text-gray-400 text-xs flex flex-row ${props.className}`}>
			Enter <span className='text-xs ml-2'>⮐</span>
		</div>
	)
}

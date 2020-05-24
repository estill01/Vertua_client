import React, { useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { MenuToggle } from '../../menus/utils'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../../buttons/account'
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
import LogoGlyph from '../../utils/LogoGlyph'
import { ReactComponent as Avatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import watch from 'redux-watch'

// TODO Make into 'React.forwardRef' (?)
export const InputBar = (props) => {
	let containerRef = React.createRef()
	let inputRef = React.createRef()
	let dispatch = useDispatch()
	let history = useHistory()
	let isDropDownVisible = useSelector(state => state.page.searchDropdown)
	const [hasInput, toggleHasInput] = useState(false)
	const [inputCache, updateInputCache] = useState('')


	function focusContainer() {
		containerRef.current.classList.add('border-blue-500')
	}
	function blurContainer() {
		containerRef.current.classList.remove('border-blue-500')
	}
	function handleInput(e) {
		if (inputRef.current.value.trim() === '') {
			if (hasInput) { toggleHasInput(false) }
			if (isDropDownVisible) {
				dispatch(toggle('dimmer'))
				dispatch(toggle('searchDropdown'))
			}
		} else {

			console.log("inputRef.current.value.trim(): ", inputRef.current.value.trim())
			console.log("inputCache: ", inputCache)

			if (!hasInput) { toggleHasInput(true) }
			if (inputRef.current.value.trim() != inputCache) {
				console.log("// New input, taking actions...")
				updateInputCache(inputRef.current.value.trim())
				if (!isDropDownVisible) {
					dispatch(toggle('dimmer'))
					dispatch(toggle('searchDropdown'))
				}
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
			if (query === '') { history.push('/') }
			else {
				history.push({
					pathname: '/search',
					search: `?query=${query}`,
				})
			}
		}
	}

	return (
		<div 
		className={`bg-secondary text-primary rounded border border-gray-400 hover:border-blue-400 flex flex-row items-center ${props.className}`}
		ref={containerRef}
		>
			<div className='p-2 flex flex-row flex-1 items-center'>
				<Icon name='search' className='mr-2' style={{marginTop:'-0.125em'}}/>
				<input 
				className='flex-1 text-xl'
				ref={inputRef}
				style={{ outline: 'none' }} 
				onFocus={() => focusContainer()}
				onBlur={() => blurContainer()}
				onInput={() => handleInput()}
				onKeyPress={(e) => handleKeyPress(e)}
				autocomplete='false'
				/>
			</div>
			<div className='p-1'>
				{ hasInput && (<EnterIndicator inputRef={inputRef} className='ml-2 mr-1'/>) }
			</div>
		</div>
	)
}


export const DropDown = React.forwardRef((props, ref) => {
	const dispatch = useDispatch()

	let isVisible = useSelector(state => state.page.searchDropdown)
	let isUserMenuOpen = useStore().getState().page.userMenu

	function _userMenuUXToggle() {
		if (isUserMenuOpen) { dispatch(toggle('userMenu')) }
	}


	return (
		<>
		{ isVisible && (
			<div className={`absolute w-full pt-3 flex flex-row ${props.className}`} >
				<div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
				<div 
				className='w-4/5 rounded border border-gray-400 bg-secondary flex flex-col' 
				style={{ minHeight: '20em'}}
				onClick={_userMenuUXToggle}
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
						<EnterIndicator inputRef={props.inputBarRef} className='ml-2'/>
					</div>
				</div>

				<div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
			</div>
			)}
		</>
	)
})

export const EnterIndicator = (props) => {

	// can check if what's passed in has teh goods, great;
	// otherwise, drill down to get to the good.

	function handleClick(e) {
		console.log("-- EnterIndicator:Click --")
		// console.log("props.inputRef.current.value: ", props.inputRef.current.value) // Works for superbar instance, not for dropdown instance
		console.log("props.inputRef: ", props.inputRef) 
	}

	return (
		<div 
		className={`bg-secondary px-1 py-px border rounded border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 text-xs flex flex-row cursor-pointer select-none ${props.className}`}
		onClick={(e) => handleClick(e)}
		>
			Enter <span className='text-xs ml-2'>⮐</span>
		</div>
	)
}

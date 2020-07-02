import React, { useState, useEffect, useCallback } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { MenuToggle } from '../../menus/utils'
import { Link, useHistory } from 'react-router-dom'
import { LogInButton, LogOutButton } from '../../buttons/account'
import { Menu, Image, Icon, Dropdown, Loader } from 'semantic-ui-react'
import LogoGlyph from '../../utils/LogoGlyph'
import { ReactComponent as Avatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import { search, stashSearch } from '../../../app/slices/SearchSlice'
import watch from 'redux-watch'
import { ReactComponent as AlgoliaLogo } from '../../../assets/images/search-by-algolia-light-background.svg'
import { DropDown } from './DropDown'   
import { EnterIndicator } from './utils.js'

export { DropDown }

export const InputBar = React.forwardRef((props, ref) => {
	const containerRef = React.createRef()
	const dispatch = useDispatch()
	const history = useHistory()
	const store = useStore()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)
	const [hasInput, toggleHasInput] = useState(false)
	const [inputCache, updateInputCache] = useState('')


	function handleFocus() {
		focusContainer()
		let query = ref.current.value.trim()
		if (query != '') {
			if (!isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
			if (!isVisibleDimmer) { dispatch(toggle('dimmer')) }
		}
	}
	function focusContainer() {
		containerRef.current.classList.add('border-blue-500')
	}
	function blurContainer(e) {
		containerRef.current.classList.remove('border-blue-500')
	}
	function handleInput(e) {
		console.log("-- handleInput")
		console.log(e.key)
		let query = ref.current.value.trim()
		if (query === '') {
			if (hasInput) { toggleHasInput(false) }
			if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
			if (!isVisibleCreationModal && isVisibleDimmer) { dispatch(toggle('dimmer')) }
		} 
		else {
			if (!hasInput) { toggleHasInput(true) }
			if (isVisibleCreationModal) { dispatch(toggle('creationModal')) }
			if (query != inputCache) {
				if (!isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
				if (!isVisibleDimmer) { dispatch(toggle('dimmer')) }
			}
			updateInputCache(query)
			dispatch(search(query))
		}
	}
	function handleKeyDown(e) {
		console.log("---- handleKeyDown")
		
		if (e.keyCode === 27 || e.key === 'Escape') {
			console.log("> Escape key pressed")
			if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
			if (!isVisibleCreationModal && isVisibleDimmer) { dispatch(toggle('dimmer')) }
			// blur the  input
			ref.current.blur()
		}


		if (e.charCode === 13 || e.key === 'Enter') {
			let query = ref.current.value.trim()
			query = encodeURIComponent(query)
			if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
			if (isVisibleDimmer) { dispatch(toggle('dimmer')) }
			if (query === '') { history.push('/') }
			else {
				dispatch(stashSearch())
				history.push({
					pathname: '/search',
					search: `?query=${query}`,
				})
			}
		} 
  }
	
	// TODO BUG: 'Enter' indicator stays on when you click logo to clear input and go to '/';  input clearing isn't getting picked up in time to toggle 'hasInput' => false.
	function handleChange(e) {
		// console.log("&&&&&&& Search Input : change")
		// console.log(e.target.value)
		// console.log(ref.current.value)
		// if (ref.current.value === '') {
		// 	console.log("EMPTY INPUT")
		// 	console.log("hasInput? (prev): ", hasInput)
		// 	toggleHasInput(false)
		// 	console.log("hasInput? (now): ", hasInput)  // Not working, b/c value cahnges on element re-render
		// }
	}

	// WHy is this triggering when the dimmer/modal shows(?)
	// B/c input.value is being set somewhere?
	useEffect(() => {
		console.log(" --- hasInput toggler")
		console.log("ref.current.value: ", ref.current.value)
		console.log("ref.current.value === '': ", ref.current.value === '')
		if (ref.current.value === '') {
			console.log("hasInput? (prev): ", hasInput)
			toggleHasInput(false)
			console.log("hasInput? (now): ", hasInput)  // Not working, b/c value cahnges on element re-render
		}
	})

	return (
		<div 
		className={`bg-secondary text-primary rounded border border-gray-400 hover:border-blue-400 flex flex-row items-center ${props.className}`}
		ref={containerRef}
		>
			<div className='p-2 flex flex-row flex-1 items-center'>
				<Icon name='search' style={{marginTop:'-0.125em'}}/>
				<input 
				id='superbar_search_input'
				className='ml-1 flex-1 text-xl'
				ref={ref}
				style={{ outline: 'none' }} 
				onFocus={() => handleFocus()}
				onBlur={(e) => blurContainer()}
				onInput={(e) => handleInput(e)}
				onKeyDown={(e) => handleKeyDown(e)}
				onChange={(e) => handleChange(e)}
				type='search'
				autoComplete='off'
				placeholder='search...'
				/>
			</div>
			<div className='p-1'>
				{ hasInput && (<EnterIndicator inputBarRef={ref} className='ml-2 mr-1'/>) }
			</div>
		</div>
	)
})


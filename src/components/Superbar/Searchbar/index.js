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

// import { useSpring, useChain, animated, config } from 'react-spring'
// import { Spring } from 'react-spring/renderprops'
   

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
				autoComplete='false'
				placeholder='search...'
				/>
			</div>
			<div className='p-1'>
				{ hasInput && (<EnterIndicator inputBarRef={ref} className='ml-2 mr-1'/>) }
			</div>
		</div>
	)
})

export const DropDown = (props) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const store = useStore()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)
	let isUserMenuOpen = useSelector(state => state.page.userMenu)

	return (
		<>
		{ isVisibleDropDown && (
			<div className={`absolute w-full flex flex-row ${props.className}`} style={props}>
				<div className='flex-1' onClick={() => {
					dispatch(nukeOverlays())
				}}/>
				<div
				className='w-4/5 rounded-b border-l border-b border-r border-gray-400 bg-secondary flex flex-col shadow' 
				>
					<SearchContent style={props}/>
					<hr/>
					<BottomBar inputBarRef={props.inputBarRef}/> 
				</div>
				<div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
			</div>
		)}
		</>
	)
}

const SearchContent = (props) => {
	const dispatch = useDispatch()
  let searchQuery = useSelector(state => state.search.query)
	let runtime = useSelector(state => state.search.runtime)

	let resultsUserIndex = useSelector(state => state.search.results.users)
	let resultsProjectIndex = useSelector(state => state.search.results.projects)
	// let resultsUserIndexCount = useSelector(state => state.search.results.users.length)
	// let resultsProjectIndexCount = useSelector(state => state.search.results.projects.length)

	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)


	return (
		<>
			<div className='flex-1 px-4 py-2'>

				<div className='flex flex-col'>
					<div className='flex flex-row'>
						<div className='flex flex-1 italic'>{searchQuery}</div>
					</div>
					<div className='flex flex-row'>
						<div className='text-xs mr-2'>{resultsUserIndex.length + resultsProjectIndex.length} results.</div>
						<div className='text-xs'>Completed in {runtime} milliseconds</div>
					</div>
				</div>

				{ resultsProjectIndex.length > 0 && ( 
				<div className='flex-1 py-2'>
					<span style={{fontVariant:'small-caps'}}>projects</span>
					<div className='flex flex-row'>
						{ resultsUserIndex.map((item, i) =>  {
						return (
						<div className='h-16 cursor-pointer rounded p-2 shadow flex flex-row' key={i}>
							<img src={item.photoURL} className='w-12 h-12 rounded'/>
							<div className='ml-2'>{item.name}</div>
						</div>
						)
						})}
					</div>
				</div>
				)}

				<div className='flex-1 py-2'>
					<span style={{fontVariant:'small-caps'}}>experiments</span>
					<div className='flex flex-row'>
						<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
						<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
						<div className='h-16 w-16 flex flex-none bg-orange-700 rounded mr-2 cursor-pointer'/>
					</div>
				</div>

				{ resultsUserIndex.length > 0 && ( 
				<div className='flex-1 py-2'>
					<span style={{fontVariant:'small-caps'}}>users</span>
					<div className='flex flex-row'>
						{ resultsUserIndex.map((item, i) =>  {
						return (
							<MiniSearchItem data={item} type='user' key={i}/>
						)
						})}
					</div>
				</div>
				)}

			</div>
		</>
	)
}

const MiniSearchItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		history.push(`${props.type}/${props.data.uid}`)
		dispatch(nukeOverlays())
		// populate a 'currentItem' in user store
	}

	return (
		<>
			<div className='h-16 cursor-pointer rounded p-2 shadow flex flex-row' onClick={() => handleClick()}>
				<img src={props.data.photoURL} className='w-12 h-12 rounded' />
				<div className='ml-2'>{props.data.displayName}</div>
			</div>
		</>
	)
}

const BottomBar = (props) => {
	const dispatch = useDispatch()
	const history = useHistory()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)

	function handelClickMoreResults() {
		let path = '/search'
		let query = encodeURIComponent(props.inputBarRef.current.value.trim())
		if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
		if (isVisibleDimmer) { dispatch(toggle('dimmer')) }
		history.push(`${path}?query=${query}`)
	}

	return (
		<>
			<div className='p-4 flex flex-row bg-primary'>
				<a 
				className='no-underline cursor-pointer hover:text-blue-500'
				style={{fontVariant:'small-caps'}} 
				onClick={handelClickMoreResults} 
				>
					more results
				</a>
				<EnterIndicator inputBarRef={props.inputBarRef} className='ml-2'/>
			</div>
		</>
	)
}


export const EnterIndicator = (props) => {
	const dispatch = useDispatch()
	const history = useHistory()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)

	function handleClick(e) {
		let query = encodeURIComponent(props.inputBarRef.current.value.trim())
		if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
		if (isVisibleDimmer) { dispatch(toggle('dimmer')) }
		if (query === '') { history.push('/') }
		else {
			history.push({
				pathname: '/search',
				search: `?query=${query}`,
			})
		} 
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

export const CancelSearch = () => {
	const dispatch = useDispatch()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)

	function handleClickCancel() {
		if (isVisibleDropDown) { dispatch(toggle('searchDropdown')) }
		if (!isVisibleCreationModal && isVisibleDimmer) { dispatch(toggle('dimmer')) }
	}
	return (
		<div 
		style={{fontVariant:'small-caps'}}
		className='text-gray-500 hover:text-gray-700 active:text-gray-300 text-sm cursor-pointer flex flex-row border rounded border-gray-500 hover:border-gray-700 active:border-gray-300 px-1'
		onClick={() => handleClickCancel()}
		>
			<span className='mr-1' style={{ marginRight: '0.25em', marginTop: '-0.05em' }}>cancel</span>
			<Icon name='cancel' style={{ marginRight: 0 }}/>
		</div>
	)
}

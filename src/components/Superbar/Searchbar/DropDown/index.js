import React, { useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toggle, nukeOverlays } from '../../../../app/slices/PageSlice'
import { ReactComponent as AlgoliaLogo } from '../../../../assets/images/search-by-algolia-light-background.svg'
import { EnterIndicator } from '../utils.js'
import { clearCurrentItem } from '../../../../app/slices/ItemsSlice.js'

// import { MiniSearchResultItem } from '../../../search'
import { ListItem } from '../../../items/ListItem.js'

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
				<div className='flex-1' onClick={() => { dispatch(nukeOverlays()) }}/>
				<div
				className='w-11/12 rounded-b border-l border-b border-r border-gray-400 bg-secondary flex flex-col shadow' 
				>
					<DropDownContent style={props}/>
					<hr/>
					<BottomBar inputBarRef={props.inputBarRef}/> 
				</div>
				<div className='flex-1' onClick={() => dispatch(nukeOverlays())}/>
			</div>
		)}
		</>
	)
}

const DropDownContent = (props) => {
	const dispatch = useDispatch()
	let isVisibleDropDown = useSelector(state => state.page.searchDropdown)
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let isVisibleDimmer = useSelector(state => state.page.dimmer)
  let searchQuery = useSelector(state => state.search.query)
	let runtime = useSelector(state => state.search.runtime)
	let resultsUserIndex = useSelector(state => state.search.results.users)
	let resultsProjectIndex = useSelector(state => state.search.results.projects)
	let resultsCount = resultsUserIndex.length + resultsProjectIndex.length
	let resultWord = () => {
		if (resultsCount === 1) { return 'Result' }
		else { return 'Results' }
	}

	return (
		<>
			<div className='flex-1 px-4 py-2'>

				<div className='flex flex-col'>
					<div className='text-sm mr-2 truncate'>
						{resultsCount} {resultWord()} for <span className='font-bold italic'>{searchQuery}</span>
					</div>
				</div>

				{ resultsProjectIndex.length > 0 && ( 
				<div className='flex-1 py-2'>
					<span style={{fontVariant:'small-caps'}}>projects</span>
					<div className='flex flex-col'>
						{ resultsProjectIndex.map((item, i) =>  {
						return (
							<ListItem key={i} data={item} type='projects' className='mb-1'/>
						)
						})}
					</div>
				</div>
				)}


				{ resultsUserIndex.length > 0 && ( 
				<div className='flex-1 py-2'>
					<span style={{fontVariant:'small-caps'}}>users</span>
					<div className='flex flex-col'>
						{ resultsUserIndex.map((item, i) =>  {
						return (
							<ListItem key={i} data={item} type='users' className='mb-1'/>
						)
						})}
					</div>
				</div>
				)}

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
				<div className='flex flex-1'>
					<a 
					className='no-underline cursor-pointer hover:text-blue-500'
					style={{fontVariant:'small-caps'}} 
					onClick={handelClickMoreResults} 
					>
						more results
					</a>
					<EnterIndicator inputBarRef={props.inputBarRef} className='ml-2'/>
				</div>
				<div>
					<AlgoliaLogo/>
				</div>
			</div>
		</>
	)
}

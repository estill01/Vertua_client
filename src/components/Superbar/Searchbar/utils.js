import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toggle } from '../../../app/slices/PageSlice'
import { Icon } from 'semantic-ui-react'
  

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

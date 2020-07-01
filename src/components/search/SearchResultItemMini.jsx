import React from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toggle, nukeOverlays } from '../../app/slices/PageSlice'
import { ReactComponent as AlgoliaLogo } from '../../assets/images/search-by-algolia-light-background.svg'
// import { EnterIndicator } from '../utils.js'
import { clearCurrentItem } from '../../app/slices/ItemsSlice.js'
import { clearSuperbarSearch } from '../../app/slices/SearchSlice.js'


export const MiniSearchResultItem = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick(e) {
		history.push(props.data.urlSlug)
		dispatch(clearCurrentItem())
		dispatch(clearSuperbarSearch())
		dispatch(nukeOverlays())
		// TODO populate a 'currentItem' in user store
	}

	return (
		<>
			<div className='h-16 cursor-pointer rounded p-2 shadow flex flex-row' onClick={() => handleClick()}>
				{ props.type === 'user' && (<MiniSearchItemUser data={props.data}/> )}
				{ props.type !== 'user' && (<MiniSearchItemProject data={props.data}/> )}
			</div>
		</>
	)
}

const MiniSearchItemUser = (props) => (
	<>
		<img src={props.data.photoURL} className='w-12 h-12 rounded' />
		<div className='ml-2'>{props.data.displayName}</div>
	</>
)
const MiniSearchItemProject = (props) => (
	<>
		<img src={props.data.photoURL} className='w-12 h-12 rounded' />
		<div className='ml-2'>{props.data.name}</div>
	</>
)





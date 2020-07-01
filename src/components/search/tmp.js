import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useStore, useDispatch, useSelector } from 'react-redux'
import watch from 'redux-watch'

import Router from '../../../router'
import { Footer } from '../utils'
import Dimmer from '../../utils/Dimmer'
import PlusButton from '../../buttons/PlusButton'
import CreationModal from '../../modals/CreationModal'

import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import { search, stashSearch, clearSearch } from '../../../app/slices/SearchSlice'
import { clearCurrentItem } from '../../../app/slices/ItemsSlice.js'

import Superbar from '../../Superbar'

const Page = () => {
	const store = useStore()
	const dispatch = useDispatch()
	const history = useHistory()
	let userMenuOpen = useSelector(state => state.page.userMenu)
//	let superbarOpen = useSelector(state => state.page.superbar)
	let plusButtonVisible = useSelector(state => state.page.plusButton)

	function handlePageClick(e) { 
		if (userMenuOpen) { dispatch(nukeOverlays()) }
	}

	function keyDownListener(e) {
		if (e.keyCode === 27 || e.key === 'Escape') {
			if (store.getState().page.creationModal) {
				dispatch(nukeOverlays())
			}
			if (!plusButtonVisible) {
				dispatch(toggle('plusButton'))
			}
		}
	}

	function popStateListener(e) {
		dispatch(clearCurrentItem)
	}



	// Popstate listener - reset 'currentItem' on browser forward/backward buttons
	useEffect(() => {
		window.addEventListener('popstate', popStateListener)
		return () => window.removeEventListener('popstate', popStateListener)
	})

	// Keydown listener - pick up e.g. 'esc' key for modal toggle
	useEffect(() => {
		document.addEventListener('keydown', keyDownListener)
		return () => document.removeEventListener('keydown', keyDownListener)
	})


	// UserMenu open/close toggle
	useEffect(() => {
		let watchUserMenu = watch(store.getState, 'page.userMenu')
		let unsubscribeWatchUserMenu = store.subscribe(watchUserMenu((newVal, oldVal) => {
			userMenuOpen = newVal
		}))
		return () => { 
			unsubscribeWatchUserMenu() 
		}
	})

	// TODO Move to SearchResultsPage(?); listener there is doing the querying.
	useEffect(() => {
		let unlisten = history.listen((location, action) => {
			let srpQuery = store.getState().search.srp.query
			let urlQuery = location.search.replace('?query=', '')
			urlQuery = decodeURIComponent(urlQuery)
			const inputEl = document.getElementById('superbar_search_input')
			if (urlQuery != '') {
				if (urlQuery != srpQuery) {
					dispatch(clearSearch())
					dispatch(search(urlQuery))
					dispatch(stashSearch())
				}
				inputEl.value = urlQuery
			}
		})
		return () => unlisten()
	})

	return (
		<>
			<div className='relative' id='outer_container'>

			{ superbarOpen && (
				<Superbar 
				id='superbar'
				style={{
					zIndex:1000
				}}
				/>
			)}

				<div 
				className='bg-secondary text-primary flex-1 min-h-screen relative'
				onClick={(e) => handlePageClick(e)}
				id='inner_container'
				>
					{ superbarOpen && (<div style={{height:'3.5em'}}/>) }
					<Router/>
					
					{ plusButtonVisible && (
					<PlusButton
					style={{
						zIndex:2100
					}}
					/>
					)}
					<Dimmer storePath='dimmer'/>
				</div>
				<Footer/>
				<CreationModal
				style={{
					zIndex:2001
				}}
				/>
				<Dimmer 
				id='global_dimmer' 
				storePath='globalDimmer' 
				className='opacity-50'
				style={{
					zIndex:2000
				}}
				/>
			</div>
		</>
	)
}

// <ScrollLock/>

export default Page
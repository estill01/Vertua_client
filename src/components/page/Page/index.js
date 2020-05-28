import React, { useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { nukeOverlays } from '../../../app/slices/PageSlice'
import { search, stashSearch, clearSearch } from '../../../app/slices/SearchSlice'
import Router from '../../../router'
import Superbar from '../../Superbar'
import PlusButton from '../../buttons/PlusButton'
import { Footer } from '../utils'
import watch from 'redux-watch'
import CreationModal from '../../modals/CreationModal'
import Dimmer from '../../utils/Dimmer'

const Page = () => {
	const store = useStore()
	const dispatch = useDispatch()
	const history = useHistory()
	let userMenuOpen = useSelector(state => state.page.userMenu)

	function handlePageClick(e) { 
		if (userMenuOpen) { dispatch(nukeOverlays()) }
	}

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
				<Superbar 
				id='superbar'
				style={{
					zIndex:1000
				}}
				/>
				<div 
				className='bg-secondary text-primary flex-1 p-4 min-h-screen relative'
				onClick={(e) => handlePageClick(e)}
				id='inner_container'
				>
					<Router/>
					<PlusButton
					style={{
						zIndex:2100
					}}
					/>
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

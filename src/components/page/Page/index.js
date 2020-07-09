import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useStore, useDispatch, useSelector } from 'react-redux'
import watch from 'redux-watch'

import Router from '../../../router'
import { Footer } from '../utils'
import Dimmer from '../../utils/Dimmer'
import PlusButton from '../../buttons/PlusButton'
import CreationModal from '../../modals/CreationModal'
import { ZINDEX } from '../../utils'

import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import { search, stashSearch, clearSearch } from '../../../app/slices/SearchSlice'
import { clearCurrentItem } from '../../../app/slices/ItemsSlice.js'
	
const Page = () => {
	const store = useStore()
	const dispatch = useDispatch()
	const history = useHistory()
	let superbarOpen = useSelector(state => state.page.superbar)
	let userMenuOpen = useSelector(state => state.page.userMenu)
	let plusButtonVisible = useSelector(state => state.page.plusButton)


	function handlePageClick(e) { 
		if (userMenuOpen) { dispatch(nukeOverlays()) }
	}

	// -----------------
	// Keydown listener
	// -----------------
	// - Pick up e.g. 'esc' key for modal toggle
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
	useEffect(() => {
		document.addEventListener('keydown', keyDownListener)
		return () => document.removeEventListener('keydown', keyDownListener)
	})

	// -----------------
	// Popstate listener 
	// -----------------
	// - Reset 'currentItem' on browser forward/backward buttons
	function popStateListener(e) {
		dispatch(clearCurrentItem)
	}
	useEffect(() => {
		window.addEventListener('popstate', popStateListener)
		return () => window.removeEventListener('popstate', popStateListener)
	})


	// -----------------
	// UserMenu visibility toggle
	// -----------------
	useEffect(() => {
		let watchUserMenu = watch(store.getState, 'page.userMenu')
		let unsubscribeWatchUserMenu = store.subscribe(watchUserMenu((newVal, oldVal) => {
			userMenuOpen = newVal
		}))
		return () => { 
			unsubscribeWatchUserMenu() 
		}
	})


	return (
		<>
			<div className='relative' id='outer_container'>
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
						zIndex: ZINDEX.plusButton
					}}
					/>
					)}
					<Dimmer 
					storePath='dimmer'
					style={{
						zIndex: ZINDEX.dimmer
					}}
					/>
				</div>
				<Footer/>
				<CreationModal
				style={{
					zIndex: ZINDEX.creationModal
				}}
				/>
				<Dimmer 
				id='global_dimmer' 
				storePath='globalDimmer' 
				className='opacity-50'
				style={{
					zIndex: ZINDEX.globalDimmer
				}}
				/>
			</div>
		</>
	)
}
export default Page

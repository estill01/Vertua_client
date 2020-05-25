import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { nukeOverlays } from '../../../app/slices/PageSlice'
import Router from '../../../router'
import Superbar from '../../Superbar'
import PlusButton from '../../buttons/PlusButton'
import { Footer } from '../utils'
import watch from 'redux-watch'
import CreationModal from '../../modals/CreationModal'
import Dimmer from '../../utils/Dimmer'

const Page = () => {
	let store = useStore()
	let dispatch = useDispatch()
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

	return (
		<>
			<Superbar/>
			<div 
			className='bg-secondary text-primary flex-1 p-4 min-h-screen relative'
			onClick={(e) => handlePageClick(e)}
			>
				<Router/>
				<PlusButton/>
				<CreationModal className='z-40'/>
				<Dimmer/>
			</div>
			<Footer/>
		</>
	)
}

// <ScrollLock/>

export default Page

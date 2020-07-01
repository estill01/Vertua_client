import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'
import { isNil } from 'lodash'


export const UserAvatar = (props) => {
	let isAnonymous = isNil(props.data.displayName) || props.data.displayName === ''
	// console.log("[UserAvatar]")
	// console.log("props.data: ", props.data)
	return (
		<>
			{ isAnonymous && (<AnonymousAvatar className={`flex-1 ${props.className}`}/>) }
			{ !isAnonymous && (<img src={props.data.photoURL} className={`flex-1 ${props.className}`}/>) }
		</>
	)
}

export const CurrentUserAvatar = (props) => {

	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let currentUser = useSelector(state => state.session.currentUser)

	return (
		<>
			{ isAnonymous && (<AnonymousAvatar className={`flex-1 ${props.className}`}/>) }
			{ !isAnonymous && (<img src={currentUser.photoURL} className={`flex-1 ${props.className}`}/>) }
		</>
	)
}

export const AvatarFrame = (props) => {
	return (
		<div className={`p-px border border-gray-400 rounded-full flex ${props.className}`}>
			{props.children}
		</div>
	)
}

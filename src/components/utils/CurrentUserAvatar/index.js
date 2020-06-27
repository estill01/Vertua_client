import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'


const CurrentUserAvatar = (props) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let currentUser = useSelector(state => state.session.currentUser)
	return (
		<>
			{ isAnonymous && (<AnonymousAvatar className={`flex-1 ${props.className}`}/>) }
			{ !isAnonymous && (<img src={currentUser.photoURL} className={`flex-1 ${props.className}`}/>) }
		</>
	)
}
export default CurrentUserAvatar

export const AvatarFrame = (props) => {
	return (
		<div className={`p-px border border-gray-400 rounded-full flex ${props.className}`}>
			{props.children}
		</div>
	)
}

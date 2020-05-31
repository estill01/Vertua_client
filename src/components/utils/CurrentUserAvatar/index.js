import React from 'react'
import { useSelector } from 'react-redux'
import { ReactComponent as AnonymousAvatar } from '../../../assets/images/avatar/noun_User_2187511.svg'


const CurrentUserAvatar = (props) => {
	let isAnonymous = useSelector(state => state.session.currentUser.isAnonymous)
	let currentUser = useSelector(state => state.session.currentUser)
	return (
		<>
			{ isAnonymous && (<AnonymousAvatar className={`${props.className}`}/>) }
			{ !isAnonymous && (<img src={currentUser.photoURL} className={`${props.className}`}/>) }
		</>
	)
}
export default CurrentUserAvatar

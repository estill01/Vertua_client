import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { toggle } from '../../../app/slices/PageSlice.js'

const MenuToggle = (props) => {
  const dispatch = useDispatch()
	const isOpen = useSelector(state => state.page.sideNav)
	const handleClick = () => dispatch(toggle('sideNav'))
	let icon = isOpen ? 'cancel' : 'bars'

	return (
		<>
			<Icon 
			name={icon} 
			onClick={handleClick} 
			className='cursor-pointer'
			{...props}
			/>
		</>
	)
}

export default MenuToggle

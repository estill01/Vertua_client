import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { toggle } from '../../../redux/slices/PageSlice.js'

const MenuToggle = () => {
  const dispatch = useDispatch()
	const isOpen = useSelector(state => state.page.sideNav)
	const handleClick = () => dispatch(toggle('sideNav'))
	let icon = isOpen ? 'cancel' : 'bars'

	return (
		<>
			<Button basic icon onClick={handleClick}>
				<Icon name={icon}/>
			</Button>
		</>
	)
}

export default MenuToggle

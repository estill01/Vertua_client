import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar, Menu } from 'semantic-ui-react';
import { MenuToggle } from '../utils'
import ThemeToggle from '../../ThemeToggle'

const SideNav = () => {

	const isVisible = useSelector(state => state.page.sideNav)

  return (
		<>
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				inverted
				vertical
				visible={isVisible}
				width='wide'
			>
				<Menu.Item>
					<div className='flex flex-row'>
						<MenuToggle/>
					</div>
					<div className='text-primary'>
						Vertua
					</div>
				</Menu.Item>
				<Menu.Item>Products</Menu.Item>
				<Menu.Item>Technology</Menu.Item>
				<Menu.Item>Sign Up</Menu.Item>
				<Menu.Item><ThemeToggle/></Menu.Item>

			</Sidebar>
		</>
	)
}

export default SideNav
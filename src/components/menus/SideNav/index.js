import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar, Menu } from 'semantic-ui-react';
import { MenuToggle } from '../utils'
import ThemeToggle from '../../utils/ThemeToggle'
import LanguageSelector from '../../utils/LanguageSelector'
import { BrowserRouter, Link } from 'react-router-dom'
import { LogInButton } from '../../buttons/account'

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

				<Menu.Item>
					<Link to='/'>Home</Link>
				</Menu.Item>

				<Menu.Item>
					<Link to='/account'>Account</Link>
				</Menu.Item>

				<Menu.Item>Products</Menu.Item>

				<Menu.Item>Technology</Menu.Item>


				<Menu.Item>
					<ThemeToggle/>
				</Menu.Item>

				<Menu.Item>
					<LanguageSelector/>
				</Menu.Item>

				<Menu.Item>
					<LogInButton/>
				</Menu.Item>

			</Sidebar>
		</>
	)
}

export default SideNav

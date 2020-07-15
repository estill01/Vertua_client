import React from 'react'
import Card from './Card'

import { ReactComponent as ProjectIcon } from './images/hexagon.svg'
import { ReactComponent as UsersIcon } from './images/user.svg'
import { ReactComponent as GroupsIcon } from './images/venn-diagram.svg'
import { ReactComponent as ExperimentsIcon } from './images/beaker.svg' 
import { ReactComponent as ToolsIcon } from './images/wrench.svg'
import { ReactComponent as ServicesIcon } from './images/truck.svg'


export const ICONS = {
	projects: <ProjectIcon/>, 
	users: <UsersIcon/>, 
	groups: <GroupsIcon/>, 
	experiments: <ExperimentsIcon/>, 
	tools: <ToolsIcon/>, 
	services: <ServicesIcon/>, 
}

export const SIZE = {
	default: '3.5rem',
	mini: '1.5rem',
	ICON: {
		default: 'h-8 w-8',
		mini: 'h-4 w-4',
		full: 'h-full w-full',
	},
}

export function icon(type, classes) {
	return React.createElement(
		'div',
		{ 
			className: classes,
			key: type,
		 },
		[ ICONS[type] ]
	)
}

export const TypeIcon = (props) => {
	return (
	<div
	className={`flex rounded border border-gray-400 ${props.className}`}
	style={{
		height: SIZE[props.size] || SIZE.default,
		width: SIZE[props.size] || SIZE.default,
		backgroundImage: 'linear-gradient(to left bottom, rgb(255, 218, 68), rgb(255, 152, 16))',
	}}
	>
		<div className='w-full h-full rounded flex items-center'>
			{ icon(props.type, `${SIZE.ICON[props.size] || SIZE.ICON.default} mx-auto`)}
		</div>
	</div>
	)
}

export const ZINDEX = {
	footer: 1,
	plusButton: 98,
	dimmer: '99',
	sideNav: 101,
	searchDropDown: 101,
	userMenu: 102,
	superbar: 200,
	globalDimmer: 1000,
	creationModal: 1001,
	loadingPage: 1000,
}

export {
	Card,
}


	// const size = {
	// 	// item: {
	// 	// 	default: {
	// 	// 		width: SIZE.default,
	// 	// 		minWidth: SIZE.default,
	// 	// 		maxWidth: SIZE.default,
	// 	// 		height: SIZE.default,
	// 	// 		minHeight: SIZE.default,
	// 	// 		maxHeight: SIZE.default,
	// 	// 	},
	// 	// 	mini: {
	// 	// 		width: SIZE.mini,
	// 	// 		minWidth: SIZE.mini,
	// 	// 		maxWidth: SIZE.mini,
	// 	// 		height: SIZE.mini,
	// 	// 		minHeight: SIZE.mini,
	// 	// 		maxHeight: SIZE.mini,
	// 	// 	},
	// 	// },
  //
	// 	icon: {
	// 		default: SIZE.ICON.default,
	// 		mini: SIZE.ICON.mini,
	// 	},
	// }
  //
		// { icon(props.type, `${size.icon[props.size] || size.icon.default} mx-auto`)}


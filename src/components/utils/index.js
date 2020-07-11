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
		default: 'h-6 w-6',
		mini: 'h-4 w-4',
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
	Card
}

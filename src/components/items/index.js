import React from 'react'
import { icon, SIZE } from '../utils'
import { 
	ItemList, 
	ListItem, 
	ListItemMini,
	ItemMadeBy,
} from './list'

export const TypeIcon = (props) => {
	const size = {
		item: {
			default: {
				width: SIZE.default,
				minWidth: SIZE.default,
				maxWidth: SIZE.default,
				height: SIZE.default,
				minHeight: SIZE.default,
				maxHeight: SIZE.default,
			},
			mini: {
				width: SIZE.mini,
				minWidth: SIZE.mini,
				maxWidth: SIZE.mini,
				height: SIZE.mini,
				minHeight: SIZE.mini,
				maxHeight: SIZE.mini,
			},
		},
		icon: {
			default: SIZE.ICON.default,
			mini: SIZE.ICON.mini,
		},
	}

	return (
	<>
		{ icon(props.type, `${size.icon[props.size] || size.icon.default} mx-auto`)}
	</>
	)
}

export {
	ItemList,
	ListItem,
	ListItemMini,
	ItemMadeBy,
}

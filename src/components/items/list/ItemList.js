import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { isNil } from 'lodash'
import { ListItem } from './ListItem.js'
import { fetchBySlug, setCurrentItem } from '../../../app/slices/ItemsSlice.js'
import { fetchProjectsForUser } from '../../../app/slices/UserSlice.js'
import { TYPES } from '../../../app/utils'

import { fetchTypeByOwner } from '../../../app/remote/firebase'

export const ItemList = (props) => {
	console.log("[ItemList] -- madeBy:", props.madeBy)
	const dispatch = useDispatch()
	const [ isLoading, setIsLoading ] = useState(false)
	const [ hasItems, setHasItems ] = useState(false)
	const [ items, setItems ] = useState([])

  useEffect(() => {
		if (!hasItems) {
			(async function() {
				let docs = await loadData()
				if (!isNil(docs)) { setItems(docs) }
				console.log("items: ", items)
			})()
		}
		return () => {}
	})

	async function loadData() {
		console.log("[ItemList.fetchData]")
		if (!isNil(props.ownerID)) {
			setIsLoading(true)
			let docs = await fetchTypeByOwner(props.type, props.ownerID)
			setIsLoading(false)
			setHasItems(true)
			return docs
		}
	}

	return (
		<div className='flex flex-col'>
			{isLoading && (<Loader active inline content='Loading'/>)}

			{!isLoading && (
					<>
					{ items.map((item, i) => {
						let classes = null
						if (items.length > i+1) { classes = 'mb-2' } 
						return <ListItem key={i} data={item} type={props.type} className={classes} madeBy={props.madeBy}/>
					})}
					</>
			)}

			{ hasItems && items.length === 0 && (
				<div>
					No {props.type}
				</div>
			)}
		</div>
	)
}


			// <button 
			// onClick={loadData}
			// className='text-gray-600 border border-gray-400 rounded p-2 pointer-cursor select-none text-lg font-bold hover:gb-gray-400 active:bg-gray-500'
			// style={{ 
			// 	fontVariant: 'small-caps',
			// 	backgroundImage: 'linear-gradient(to top, #cbd5e0, #e2e8f0)',
			// }}
			// >
			// 	load data
			// </button>
      //

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CardHeader } from '../utils'
import { setCurrentItem } from '../../../app/slices/ItemsSlice.js'
import { Loader } from 'semantic-ui-react'
import { ListItem } from '../../items'
import { firebase } from '../../../app/remote/firebase'


const RecentProjectsCard = (props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hasItems, setHasItems] = useState(false)
	const [ items, setItems ] = useState([])
	let firestore = firebase.firestore()
	
	useEffect(() => {
		(async function() {
			if (!hasItems) {
				setIsLoading(true)
				let querySnapshot = await firestore.collection('projects').limit(10).get()
				setIsLoading(false)
				let arrDocSnapshot = querySnapshot.docs
				let docs = arrDocSnapshot.map((doc) => doc.data())
				console.log("[RecentProjects]")
				console.log(docs)
				setItems(docs)
				setHasItems(true)
			}
		})()
		return () => {}
	})


	return (
		<>
			<div className='pb-4 flex flex-col'>
				<CardHeader
				text='Recent Projects'
				subText='New projects from the community'
				/>
				<div className='px-4'>
					{ isLoading && (<Loader active inline content="Loading"/>) }
					{ !isLoading && hasItems && (
						<>
							{ items.map((item, i) => {
								console.log("MADE BY: ", item.creator)
								let classes = null
								if (items.length > i+1) { classes = 'mb-2' }
								return (
									<ListItem 
									key={i} 
									data={item} 
									type='projects' 
									className={classes} 
									madeBy={true}
									/>
								)
							})}
						</>
					)}
				</div>
			</div>
		</>
	)
}
export default RecentProjectsCard


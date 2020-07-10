import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PageErrorBoundary from './PageErrorBoundary'
import { isNil } from 'lodash'

import { fetchCurrentItem } from '../app/utils'
import { TYPES } from '../components/utils'
import { UserInfoCard } from '../components/items/user'
import { ItemList } from '../components/items'
import { SectionHeader } from '../components/page/section'

import { Card } from '../components/utils'

const UserPage = (props) => {
	let currentItem = useSelector(state => state.items.current)
	useEffect(() => { fetchCurrentItem() })

	return (
		<>
			<PageErrorBoundary>
				<div className='p-4'>
				  { currentItem && ( <UserInfoCard data={currentItem}/> )}

					{ currentItem && (
						<>

							<Card className='mt-4'>
								<SectionHeader type={TYPES.projects} className='mb-2'/>
								<ItemList ownerID={currentItem.uid} type={TYPES.projects}/>
							</Card>
						</>
					)}

				</div>
			</PageErrorBoundary>
		</>
	)

}
export default UserPage

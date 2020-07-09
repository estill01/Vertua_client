import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PageErrorBoundary from './PageErrorBoundary'
import { isNil } from 'lodash'

import { fetchCurrentItem } from '../app/utils'
import { TYPES } from '../components/utils'
import { UserInfoCard } from '../components/items/user'
import { ItemList } from '../components/items'
import { SectionHeader } from '../components/page/section'

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
							<SectionHeader type={TYPES.projects}/>
							<ItemList data={currentItem}/>
						</>
					)}

				</div>
			</PageErrorBoundary>
		</>
	)
}
export default UserPage

import React from 'react'
import { useSelector} from 'react-redux'
import { isNil } from 'lodash'
import Card from '../../utils/Card'
import { UserAvatar } from '../../utils/UserAvatar'

export const UserInfo = (props) => {
	let currentItem = useSelector(state => state.items.current)
	return (
		<div className='flex flex-row'>
			{ currentItem && ( 
			<>
				<div className='h-24 w-24 border border-gray-400 rounded p-px bg-white'>
					<UserAvatar data={currentItem} className='rounded-sm'/>
				</div>

				<div className='flex flex-col ml-2'>

					{ currentItem && (currentItem.displayName === '' || isNil(currentItem.displayName)) && (
					<>
						<div>Anonymous User:</div>
						<div className='text-xl font-bold'>
							{currentItem.uid}
						</div>
					</>
					)}

					{ currentItem && (currentItem.displayName !== '' && !isNil(currentItem.displayName)) && (
					<>
						<div>Name:</div>
						<div className='text-xl font-bold'>
							{currentItem.displayName}
						</div>
					</>
					)}

					<div className='mt-2'>
						<div>Member Since:</div>
						<div className=''>{(() => {
							let date = new Date(currentItem.createdAt)
							return date.toString()
						})()}</div>
					</div>
				</div>
			</>
			)}
		</div>
	)
}

export const UserInfoCard = (props) => (
	<Card>
		<UserInfo {...props}/>
	</Card>
)

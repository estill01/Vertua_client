import React from 'react'
import { useSelector} from 'react-redux'
import { isNil } from 'lodash'
import Card from '../../utils/Card'
import { UserAvatar } from '../../utils/UserAvatar'

export const UserInfo = (props) => {
	return (
		<div className='flex flex-row'>

			<div className='h-24 w-24 border border-gray-400 rounded p-px bg-white'>
				<UserAvatar data={props.data} className='rounded-sm'/>
			</div>

			<div className='flex flex-col ml-2'>
				{ (props.data.displayName === '' || isNil(props.data.displayName)) && (
				<>
					<div>Anonymous User:</div>
					<div className='text-xl font-bold'>
						{props.data.uid}
					</div>
				</>
				)}

				{ props.data.displayName !== '' && !isNil(props.data.displayName) && (
				<>
					<div>Name:</div>
					<div className='text-xl font-bold'>
						{props.data.displayName}
					</div>
				</>
				)}

				<div className='mt-2'>
					<div>Member Since:</div>
					<div className=''>
					{(() => {
						let date = new Date(props.data.createdAt)
						return date.toString()
					})()}
					</div>
				</div>
			</div>

		</div>
	)
}

export const UserInfoCard = (props) => (
	<Card>
		<UserInfo {...props}/>
	</Card>
)

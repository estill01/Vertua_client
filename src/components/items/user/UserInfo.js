import React, { useEffect } from 'react'
import { useSelector} from 'react-redux'
import { isNil } from 'lodash'
import Card from '../../utils/Card'
import { UserAvatar } from '../../utils/UserAvatar'
import { HorizontalLoader } from '../../utils/Loaders/index.js'

export const UserInfo = (props) => {
	let date = new Date(props.data.createdAt)
	date = date.toString()

	let name = props.data.displayName || props.data.uid

	console.log("[UserInfo]")
	console.log("props.data: ", props.data)
	console.log("props.data.displayName: ", props.data.displayName)

	return (
		<div className='flex flex-row'>

			<div className='h-24 w-24 border border-gray-400 rounded p-px bg-white'>
				<UserAvatar data={props.data} className='rounded-sm'/>
			</div>

			<div className='flex flex-col ml-2'>

				{ props.data.displayName === undefined && (
				<div className='flex flex-1 items-center'>
					<HorizontalLoader/>
				</div>
				)}

				{ props.data.displayName === '' && (
				<div>Anonymous User:</div>
				)}
				{ props.data.displayName !== '' && !isNil(props.data.displayName) && (
				<div>Name:</div>
				)}

				<div className='text-xl font-bold'>
					{ name }
				</div>

				{ !isNil(props.data.createdAt) && (
				<>
					<div className='mt-2'>Member Since:</div>
					<div>
						{date}
					</div>
				</>
				)}


			</div>

		</div>
	)
}










export const UserInfoCard = (props) => (
	<Card>
		<UserInfo {...props}/>
	</Card>
)

				// { (props.data.displayName === '' || isNil(props.data.displayName)) && (
				// <>
				// 	<div>Anonymous User:</div>
				// 	<div className='text-xl font-bold'>
				// 		{props.data.uid}
				// 	</div>
				// </>
				// )}
        //
				// { props.data.displayName !== '' && !isNil(props.data.displayName) && (
				// <>
				// 	<div>Name:</div>
				// 	<div className='text-xl font-bold'>
				// 		{props.data.displayName}
				// 	</div>
				// </>
				// )}
        //

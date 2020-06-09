import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import watch from 'redux-watch'
import { toggle, nukeOverlays } from '../../../app/slices/PageSlice'
import CurrentUserAvatar, { AvatarFrame } from '../../utils/CurrentUserAvatar'
import { ProjectForm, ProjectFormFull } from '../../forms/ProjectForm'
import Card from '../../utils/Card'
import { createItem, Collection } from '../../../app/utils'
import { nanoid } from 'nanoid'

// TODO Save WIP drafts
// TODO Disable multi-submit
export const CreationModal = (props) => {
	const dispatch = useDispatch()
	const projectId = nanoid()
	const [isSubmitting, setSubmitting] = useState(false)
	let isVisibleCreationModal = useSelector(state => state.page.creationModal)
	let refForm = React.createRef()

	
  async function submitForm() {
		console.log("[CreationModal] submitForm()")

		// if (!isSubmitting) {
		// 	setSubmitting(true)

			let valid = await refForm.current.validateForm()
			if (Object.entries(valid).length === 0) {
				console.log("form: ", refForm.current)
				refForm.current.submitForm()
				let values = refForm.current.values
				console.log("values: ", values) 
				createItem({ values: values, collection: Collection.PROJECTS, itemId: projectId })
				refForm.current.resetForm()

				// setSubmitting(false)
			} 
		// }
	}




				// let doc = {
				// 	data: {
				// 		...refForm.current.values,
				// 		uid: projectId,
				// 		creatorId: currentUser.uid,
				// 	},
				// 	collection: Collection.PROJECTS, // TODO use enum e.g. Types.PROJECT
				// }
				// try { await dispatch(createItem(doc)) }
				// catch (err) { throw new Error(err) }

	return (
		<>
		{ isVisibleCreationModal && (
			<ModalCard>
				<ModalCardTopBar/>
				<ModalCardBody>
					<ProjectForm ref={refForm} autoSelect={true}/>
				</ModalCardBody>

				<ModalCardBottomBar>
					<div 
					className='flex-1 px-4 py-2 bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 border border-blue-500 rounded select-none cursor-pointer font-bold text-center'
					onClick={() => submitForm()}
					>
						Post
					</div>
				</ModalCardBottomBar>
			</ModalCard>
		)}
		</>
	)
}
export default CreationModal

					// <ProjectForm className='flex-1' ref={refForm} projectId={projectId}/>

// const ApproachBuilder = (props) => {
// 	const approaches = []
// 	const addApproach = () => {
// 		approaches.push({
// 			ref = React.createRef(),
// 		})
// 	}
//
// 	return (
// 		<>
// 			<div>
// 				{ approaches.map((approach, i) => {
// 					return (
// 						<ApproachForm projectId={props.id} key={i} ref={approach.ref}/>
// 					)
// 				})}
// 				<div onClick={addApproach}>+ Approach</div>
// 			</div>
// 		</>
// 	)
// }
//
// const ApproachForm = React.forwardRef((props, ref) => {
// })




// ---------------------------------------------------
const ModalCardTopBar = (props) => {
	const store = useStore()
	const currentUser = store.getState().session.currentUser

  return (
		<div className={`p-2 flex flex-row bg-secondary rounded-t items-center border-b border-gray-300 ${props.className}`}>
				<div className='p-px flex-1 flex flex-row items-center'>
					<AvatarFrame className='h-10 w-10'>
						<CurrentUserAvatar/>
					</AvatarFrame>
					<div className='flex flex-col ml-2 leading-none'>
						<div className='text-sm font-bold'>{currentUser.displayName}</div>
						<div className='text-xs'>@estill01</div>
					</div>
				</div>

				<div className='flex-1 flex flex-row items-center'>
					<div className='mx-auto flex flex-row'>
						<div className='flex p-1 h-6 w-6 bg-blue-300 rounded-full border border-blue-400 mr-2 text-white flex flex-row'>
							<span className='self-center mx-auto'>+</span>
						</div>
						<div className='flex text-gray-500 text-xl font-extrabold'>
							Add Project
						</div>
					</div>
				</div>

				<div className='flex-1 flex flex-row'>
					<span className='flex-1'/>
					<CloseModalButton/>
				</div>
		</div>
	)
}

const ModalFrame = (props) => {
	const dispatch = useDispatch()
	function handleClickContainer(e) {
		dispatch(nukeOverlays())
		dispatch(toggle('plusButton'))
	}
	return (
		<div 
		className={`fixed w-screen h-screen top-0 left-0 flex flex-row ${props.className}`} 
		style={props.style}
		onClick={(e) => handleClickContainer(e)}
		>
			{props.children}
		</div>
	)
}

const ModalCard = (props) => {
	function handleClickModal(e) {
		console.log("--- Click: INNER --")
		e.stopPropagation()
		// if (isUserMenuOpen) { dispatch(toggle('userMenu')) }
	}

	return (
		<>
			<ModalFrame style={{zIndex:3000}}>
				<div
				className='mx-auto mt-8 w-4/5 rounded-md border border-gray-500 shadow-md bg-secondary flex flex-col' 
				style={{ 
					minHeight: '20em',
					height: '90%',
				}}
				onClick={(e) => handleClickModal(e)}
				>
					{props.children}
				</div>
			</ModalFrame>
		</>
	)
}

const ModalCardBody = (props) => {
	return (
		<div 
		className={`flex flex-col flex-1 p-4 rounded-b ${props.className}`}
		style={{
			overflowY:'scroll',
		}}
		>
			{props.children}
		</div>
	)
}


const ModalCardBottomBar = (props) => {
	return (
		<>
			<div className='flex flex-row p-2 bg-secondary border-t border-gray-400'>
				<div className='flex-1'>
				</div>
				<div className='flex-1 flex items-center'>
					{props.children}
				</div>
				<div className='flex-1'>
				</div>
			</div>
		</>
	)
}

// -------------------------------------------------

const ExpandButton = (props) => {
	const history = useHistory()
	const dispatch = useDispatch()

	function handleClick() {
		// make sure you grab whatever content has been entered in the form
		dispatch(toggle('dimmer'))
		dispatch(toggle('creationModal'))
		history.push('/new')
	}
	return (
		<>
			<div 
			className='flex flex-col items-center cursor-pointer select-none'
			onClick={handleClick}
			>
				<Icon name='expand' color='blue'/>
				<a 
				className='hover:text-blue-500 active:text-blue-300'
				style={{fontVariant:'small-caps'}}
				>
					expand
				</a>
			</div>
		</>
	)
}

const CloseModalButton = (props) => {
	const dispatch = useDispatch()
	function toggleModal() {
		dispatch(nukeOverlays())
		dispatch(toggle('plusButton'))
	}
	return (
		<>
			<div 
			className='text-gray-500 hover:text-gray-600 active:text-gray-700 p-2 text-lg select-none cursor-pointer'
			onClick={() => toggleModal()}
			>
				X
			</div>
		</>
	)
}


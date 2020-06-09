import React, { useEffect, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { string as YupString, object as YupObject } from 'yup'
import { Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'
import { Icon } from 'semantic-ui-react'
import CurrentUserAvatar, { AvatarFrame } from '../utils/CurrentUserAvatar'
import { nanoid } from 'nanoid'

import Card from '../utils/Card'

// FORM:AGGREGATE
// ----------------------------------
export const ProjectFormFull = (props) => {
	let formRef = React.createRef

	function submitForm() {
		console.log("TODO -- SUBMIT FORM")
	}

	useEffect(() => {
		console.log(">> ProjectFormFull")
		console.log("props.formRef: ", props.formRef)
	})

	return (
		<>
			<div className={`flex flex-col ${props.className}`}>

				<Card className='flex flex-row'>
					<ThumbnailUploader/>
					<ProjectForm className='flex-1 ml-4' autoSelect={true} ref={formRef}/>
				</Card>

				<div className='p-2 flex-1 flex flex-col mt-1'>
					<ItemDetailsMultiForm className='flex-1'/>
				</div>

				<div className='px-4'>
					<span style={{fontVariant:'small-caps'}} className='text-blue-400 hover:text-blue-300 active:text-blue-500 cursor-pointer select-none'>
					+ add approach
					</span>
				</div>

			</div>
		</>
	)
}



// FORM:CORE:SCHEMA
// ----------------------------------
const ProjectSchema = YupObject().shape({
	name: YupString()
		.min(1, "Project name must be between 1 and 100 characters.")
		.max(100, "Project name must be between 1 and 100 characters.")
		.required(),
	description: YupString()
		.max(500, "Project description cannot exceed 500 characters.")
})

// FORM:CORE
// ----------------------------------
export const ProjectForm = React.forwardRef((props, ref) => {
	const dispatch = useDispatch()
	const id = nanoid()
	let formValues = null

	const handleSubmit = (values, actions) => {
		console.log("-- PROJECT FORM: handleSubmit() --")
		// console.log("values: ", values)
		// console.log("actions: ", actions)
	}

	// useImperativeHandle(ref, () => ({
	// 	submitForm,
	// }))

	useEffect(() => {
		if (props.autoSelect === true) {
			document.getElementById(id).focus()
		}
	})

	return (
		<>
			<div 
			className={`flex flex-col ${props.className}`}
			>
				<Formik
					initialValues = {{
						name:'',
						description:''
					}}
					validationSchema={ProjectSchema}
					onSubmit={handleSubmit}
					innerRef={ref}
				>
					<Form 
					className={'flex flex-col flex-1'}
					>
						
						<div className='flex flex-row'>
							<div className='flex-1 flex flex-col pt-1'>
								<Field 
								type='text' 
								name='name' 
								id={id}
								placeholder='Name' 
								className='border-b border-gray-400 text-2xl pb-2'
								style={{ outline: 'none' }}
								autoComplete='off'
								/>
								<ErrorMessage name='name' component='div' className='text-red-400'/>

								<Field 
								name='description'
								placeholder='Description' 
								className='resize-none mt-4 flex-1'
								style={{ outline: 'none' }}
								minRows={2}
								as={TextareaAutosize}
								/>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</>
	)
})


// const ApproachBuilder = (props) => {
// 	return (
// 		<>
// 			<span style={{fontVariant:'small-caps'}} className='text-blue-400 hover:text-blue-300 active:text-blue-500 cursor-pointer select-none'>
// 			+ add approach
// 			</span>
// 		</>
// 	)
// }

const ItemDetailsMultiForm = (props) => {
	return (
		<>
			<div className={`flex flex-row ${props.className}`}>
				<div className='flex flex-col w-40 bg-primary rounded-l border-t border-l border-r border-b border-gray-300'>

					<div className='flex flex-col flex-1'>
						<div className='flex flex-row border-b border-gray-500 px-4 py-2 mb-2'>
							<div className='text-2xl'>
								<span style={{fontVariant:'small-caps'}}>approach</span>
								<span className='text-lg ml-1'>1</span>
							</div>
						</div>


						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='list'/>
							<span>steps</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='crosshairs'/>
							<span>goals</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='check'/>
							<span>requirements</span>
						</div>
						
						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='forward'/>
							<span>impact</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='warning sign'/>
							<span>challenges</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='lab'/>
							<span>experiments</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='cube'/>
							<span>materials</span>
						</div>

						<div className='flex flex-row items-center px-4 py-1 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='globe'/>
							<span>background</span>
						</div>

						<div className='flex flex-row items-center px-4 pt-1 pb-2 cursor-pointer hover:bg-gray-300 active:bg-gray-400 select-none' style={{fontVariant:'small-caps'}}>
							<Icon name='heart outline'/>
							<span>needs</span>
						</div>

					</div>


				</div>

				<div className='flex flex-1 bg-secondary p-4 border-t border-r border-b border-gray-300 rounded-r'>
				</div>

			</div>
		</>
	)
}

					// -- Add to Approach --
					// <div className='flex flex-row' style={{fontVariant:'small-caps'}}>
					// 	<Icon name='list'/>
					// 	<span>Steps</span>
					// </div>



// <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>

const FormattedTextareaAutosize = () => (
	<TextareaAutosize minRows='3' className='p-3' placeholder='description'/>
)

const ThumbnailUploader = (props) => {
	return (
		<div className={`h-40 w-40 rounded border border-gray-400 bg-gray-200 flex items-center text-gray-600 cursor-pointer select-none ${props.className}`}>
			<div className='flex flex-col mx-auto'>
				<Icon name='image outline' size='large' fitted={true}/>
				<span className=''>Upload Thumbnail</span>
			</div>
		</div>
	)
}


// let uid = getUID()
//
// <ProjectForm>
// 	<BasicInfo uid={uid}/>
// 	<ACL uid={uid}/>
// 	<Approaches uid={uid}/>
// </ProjectForm>

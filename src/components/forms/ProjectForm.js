import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { string as YupString, object as YupObject } from 'yup'
import { Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'
import { Icon } from 'semantic-ui-react'

import Card from '../utils/Card'

const ProjectSchema = YupObject().shape({
	name: YupString()
		.min(1, "Project name must be between 1 and 100 characters.")
		.max(100, "Project name must be between 1 and 100 characters.")
		.required(),
	description: YupString()
		.max(500, "Project description cannot exceed 500 characters.")
})

export const ProjectForm = (props) => {
	const dispatch = useDispatch()
	function submitForm(values) {
	}

	return (
		<>
			<Formik
				initialValues = {{
					name:'',
					description:''
				}}
				validationSchema={ProjectSchema}
				onSubmit={ (values, bag)  => {
					console.log("-- Submit: Project Form")
					console.log(values)
					console.log("bag: ", bag)
					bag.setTouched(false)
					bag.resetForm()
					// TODO -- how reset 'touched' to not trigger error?
					submitForm(values)
				}}
			>
				<Form 
				className={`flex flex-col ${props.className}`}
				>

					<Card>
					
					<div className='flex flex-row'>
						<div className='h-40 w-40 rounded border border-gray-400 bg-gray-200 flex items-center text-gray-600 cursor-pointer select-none'>
							<div className='flex flex-col mx-auto'>
								<Icon name='image outline' size='large' fitted={true}/>
								<span className=''>Upload Thumbnail</span>
							</div>
						</div>
						<div className='flex-1 flex flex-col ml-4'>
							<Field 
							type='text' 
							name='name' 
							placeholder='Name' 
							className='border-b border-gray-400 text-2xl pb-2'
							style={{ outline: 'none' }}
							autoComplete='off'
							/>
							<ErrorMessage name='name' component='div' className='text-red-400'/>

							<Field 
							name='description'
							placeholder='Description' 
							className='resize-none mt-4'
							style={{ outline: 'none' }}
							minRows={2}
							as={TextareaAutosize}
							/>
						</div>
					</div>

					</Card>

					<button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
				</Form>
			</Formik>
		</>
	)
}

const FormattedTextareaAutosize = () => (
	<TextareaAutosize minRows='3' className='p-3' placeholder='description'/>
)

const NewProjectForm = () => (
	<>
		<h3>New Project</h3>
		<ProjectForm className='flex flex-col'/>
	</>
)

export default NewProjectForm


// let uid = getUID()
//
// <ProjectForm>
// 	<BasicInfo uid={uid}/>
// 	<ACL uid={uid}/>
// 	<Approaches uid={uid}/>
// </ProjectForm>

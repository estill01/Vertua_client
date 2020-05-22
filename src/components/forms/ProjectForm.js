import React from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { string as YupString, object as YupObject } from 'yup'
import { Input } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

const ProjectSchema = YupObject().shape({
	name: YupString()
		.min(1, "Project name must be between 1 and 100 characters.")
		.max(100, "Project name must be between 1 and 100 characters.")
		.required(),
	description: YupString()
		.max(500, "Project description cannot exceed 500 characters.")
})

export const ProjectForm = (props) => (
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
			}}
		>
			<Form className={props.className}>

				<Field type='text' name='name' placeholder='name' className='p-4'/>
				<ErrorMessage name='name' component='div'/>

				<Field 
				name='description'
				placeholder='description' 
				className='p-4' 
				minRows='2'
				as={TextareaAutosize}
				/>

				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
			</Form>
		</Formik>
	</>
)

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

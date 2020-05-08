import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { string as YupString, object as YupObject} from 'yup'
import { Input } from 'semantic-ui-react'

const LogInSchema = YupObject().shape({
	email: YupString()
		.email('Invalid email')
		.required('Required'),
	password: YupString()
		.min(8, 'Password must be at least 8 characters.')
		.max(500, 'Password cannot exceed 100 characters.')
})

const LogInForm = () => (
	<>
		<Formik
		  initialValues = {{
				email: '',
				password: '',
			}}
			validationSchema={LogInSchema}
			onSubmit={ values => {
				// TODO firebase.auth.xyz
				console.log("## Log In Form -- SUBMIT")
				console.log(values)
			}}
		>
			<Form>
				<Field type='email' name='email' placeholder='email' as={Input}/>
				<ErrorMessage name='email' component='div'/>
				<Field type='password' name='password' placeholder='password' as={Input}/>
				<ErrorMessage name='password' component='div'/>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
			</Form>
		</Formik>
	</>
)

export default LogInForm



// ------------------------------------------------------------

// const SignUpForm = (props) => {
// 	const {
// 		values,
// 		touched,
// 		errors,
// 		handleChange,
// 		handleBlur,
// 		handleSubmit,
// 	} = props
//
// 	return (
// 	  <form onSubmit={handleSubmit}>
// 			<input
// 			  type='text'
// 				onChange={handleChange}
// 				onBlur={handleBlur}
// 				value={values.name}
// 				name='name'
// 			/>
// 			{errors.name && touched.name && <div id='feedback'>{errors.name}</div>}
// 			<button type='submit'>Submit</button>
// 		</form>
// 	)
// }
//
// const MyEnhancedSignUpForm = withFormik({
// 	mapPropsToValues: () => ({ 
// 		name: '',
// 	}),
// 	validate: values => {
// 		const errors = {}
// 		if (!values.name) { errors.name = 'Required' }
// 		return errors
// 	},
// 	handleSubmit: (values, { setSubmitting }) => {
// 		setTimeout(() => {
// 			alert(JSON.stringify(values, null, 2))
// 			setSubmitting(false) // only need to do this if submit function is not async
// 		}, 1000)
// 	},
// 	displayName: 'SignUpForm',
// })(SignUpForm)
//
//

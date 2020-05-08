import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { string as YupString, object as YupObject } from 'yup'

const SignUpSchema = YupObject.shape({
	email: YupString()
		.email('Invalid email')
		.required('Required'),
	password: YupString()
		.min(8, 'Password must be at least 8 characters.')
		.max(500, 'Password cannot exceed 500 characters')
})

const SignUpForm = () => (
	<>
		<Formik>
			<Form>
			</Form>
		</Formik>
	</>
)

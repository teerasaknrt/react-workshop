import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});

export default class Register extends Component {
    state = {
        statusemail : true
    }
    register = async (values) => {
        try {
            const apiUrl = 'https://shop-backendapi.herokuapp.com/api/user/register';
            const response = await axios.post(apiUrl, values)
            console.log(response.status)
            if (response.status === 201) {
                Swal.fire('ลงทะเบียนสำเร็จ', '','success')
                this.cancelCourse()
            }
        } catch (error) {
            Swal.fire('Oops...', 'Something went wrong!', 'error')
            this.setState({
                statusemail : false
            })
        }
    }

    cancelCourse = () => { 
        document.getElementById("register-form").reset();
    }

    render() {
        return (
            <>
                <div className="container my-5">

                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h1>ลงทะเบียน</h1>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                    this.register(values)
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form id="register-form">
                                        <div className="form-group">
                                            <Field name="name" className={`form-control ${touched.name ? errors.name ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Fullname"  />
                                            {errors.name && touched.name ? (
                                                <div>{errors.name}</div>
                                            ) : null}
                                        </div>

                                        <div className="form-group">
                                            <Field name="email" type="email" className={`form-control ${touched.email ? errors.email || this.state.statusemail === false ? 'is-invalid' : 'is-valid' : ''}`} placeholder="Email" />
                                            {errors.email && touched.email ? (
                                                <div>{errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : !errors.password && touched.password ? 'is-valid' : ''}`} placeholder="Password" />
                                            {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                        </div>
                                        <button type="submit" className="btn btn-info">Submit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

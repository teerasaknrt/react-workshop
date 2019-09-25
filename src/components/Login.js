import React, { Component } from 'react'

import { Formik, Form, Field } from "formik";
import axios from 'axios';
import { json } from 'body-parser';

export default class Login extends Component {

    state = {
        profile: null,
        isLogin: false
    }

    login = async (values) => {
        try {
            let apiUrl = 'https://shop-backendapi.herokuapp.com/api/user/login';
            let response = await axios.post(apiUrl, values)
            //console.log(response.data)
            localStorage.setItem('token', JSON.stringify(response.data))
            const token = JSON.parse(localStorage.getItem('token'))
            apiUrl = 'https://shop-backendapi.herokuapp.com/api/user/me';
            response = await axios.get(apiUrl, {
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                }
            })

            localStorage.setItem('profile', JSON.stringify(response.data.user))
            this.setState({
                profile: response.data.user,
                isLogin: true
            })
        } catch (error) {
            alert(error.response.data.error.message)
            this.setState({
                isLogin: false
            })
        }
    }

    logout = () => {

        this.setState({
            profile: null,
            isLogin: false
        })
        localStorage.removeItem('profile')
        localStorage.removeItem('token')

    }

    componentDidMount() {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            this.setState({
                profile: profile,
                isLogin: true
            })
        } else {
            this.logout()
        }
    }

    render() {
        return (
            <>
                {
                    this.state.isLogin ? (
                        <span className="navbar-text">
                            Welcome {this.state.profile.name}
                            <button
                                type="submit"
                                className="btn btn-outline-light ml-1 my-2 my-sm-0 btn-sm"
                                onClick={this.logout}
                            >
                                Logout
                            </button>
                        </span>
                    ) : (
                            <Formik
                                onSubmit={(values, { setSubmitting }) => {

                                    this.login(values);

                                    setSubmitting(false);

                                }}
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                            >
                                {

                                    ({
                                        handleSubmit,
                                        handleChange,
                                        isSubmitting
                                    }) => (
                                            <Form className="form-inline">


                                                <div className="form-group">
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        autoComplete="username"
                                                        className="form-control-sm mr-2"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        autoComplete="new-password"
                                                        className="form-control-sm mr-2"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-outline-success my-2 my-sm-0 btn-sm"
                                                    disabled={isSubmitting}
                                                >
                                                    Log In
                                                </button>


                                            </Form>
                                        )

                                }
                            </Formik>
                        )
                }
            </>
        )
    }
}

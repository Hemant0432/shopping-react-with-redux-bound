import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Routes, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie"; 
import { ValidationSuccess } from "./ValidationSuccess2";


export const UserDetailsContex = React.createContext(null);

export function FormValidationTwo() {

    
    const [cookie, setCookies, removeCookies] = useCookies();
    const [cookiepa, setCookiespa, removeCookiespa] = useCookies();
    const navigate = useNavigate();

    const handleFormSubmit = async (values, { setSubmitting, setStatus, setErrors }) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus('success');
                setCookies("username", values.username);
                setCookiespa("password", values.password);
                // console.log(data);
                navigate('Account')
                // Use the data as needed
            } else {
                const error = await response.json();
                setErrors({ apiError: error.message });
                setStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ apiError: 'An error occurred during the API request.' });
            setStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div>
            <div>
                <div>
                    <section className="vh-100 bg-image"
                        style={{
                            backgroundImage: `url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")`
                        }}>
                        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-9 col-lg-7 col-xl-6" >
                                        <div className="card" style={{ borderRadius: '15px' }}>
                                            <div className="card-body p-5">
                                                <h2 className="text-uppercase text-center mb-5">Login Form</h2>
                                                <Formik
                                                    initialValues={{ username: '', password: '' }}
                                                    onSubmit={handleFormSubmit}
                                                    validateOnChange={false}
                                                    validateOnBlur={false}>
                                                    {({ isSubmitting, status }) => (

                                                        <Form>
                                                            <div className='form-outline mb-4'>
                                                                <label className='form-label' for="username">Username:</label>
                                                                <Field type="text" id="username" name="username" className='form-control form-control-lg' />
                                                                <ErrorMessage name="username" component="div" />
                                                            </div>
                                                            <div className="form-outline mb-4">
                                                                <label className='form-label' for="password">Password:</label>
                                                                <Field type="password" id="password" name="password" className="form-control form-control-lg" />
                                                                <ErrorMessage name="password" component="div" />
                                                            </div>

                                                            {status === 'error' && <div className='text-danger'>{'An error occurred during the API request.'}</div>}
                                                            {status === 'success' && <div className='text-success'>{'API request was successful.'}
                                                            </div>}

                                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-3">
                                                                <button type="submit" disabled={isSubmitting} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
            
        </div>
    )


}
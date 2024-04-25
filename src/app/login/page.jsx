'use client';

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchCsrfToken } from '../../services/api';
import Error from '../components/Error'
import csrf from 'csrf-token'

const Login = () => {
  const { loading, user, error } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
const [csrfToken, setCsrfToken] = useState('')
 
 
  useEffect(() => {
    if (csrfToken === '') {
      csrf.create('I like CSRF it makes me feel whole').then(token => {
        console.log("====getcsrfToken", token)
        setCsrfToken(token)
      })
     }
  }, [])
  console.log("=getcsrfToken", csrfToken)
  const handleLoginSubmit = (data) => {
    const formData = {...data, csrfmiddlewaretoken: csrfToken}; // Get form data
     console.log("======formData========>", formData)
    dispatch(login(formData))
  };

  console.log("=====user=========>",csrfToken)
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
              {error && <Error>{error}</Error>}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <input {...register('csrfmiddlewaretoken')} type="hidden" name="csrfmiddlewaretoken" value={csrfToken}/>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span> {/* Icon for username */}
                    </div>
                    <input {...register('username')} type="text" className="form-control" id="username" placeholder="Enter username" />
                    {errors.username && <span>{username} is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-lock"></i></span> {/* Icon for password */}
                    </div>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder="Enter password" />
                    {errors.password && <span>{password} is required</span>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              <div className="text-center mt-3">
                <a href="/forgotPassword">Forgot Password?</a>
              </div>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

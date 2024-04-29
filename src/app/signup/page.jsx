'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter  } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../services/api';
import Error from '../components/Error'
import Link from "next/link"


const SignUp = () => {
  const { register: registerInput, handleSubmit } = useForm();
  const { loading, user, error } = useSelector(
    (state) => state.auth
  )
  const router = useRouter();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState('')
  const handleRegisterSubmit = async(data) => {
  
    setIsError('')
    delete data['confirm_password']
    const formData = { ...data }
    dispatch(register(formData))
  }

  
useEffect(() => {
  if (!user?.error?.message && user) {
    router.push('/login');
  }
}, [user])

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* First part - Company Logo */}
          <div className="text-center mt-5">
            <img src="/assets/images/logo.svg" alt="Company Logo" style={{ maxWidth: '100%' }} />
          </div>
        </div>
        <div className="col-md-6">
          {/* Second part - Sign Up Form */}
          <div className="mt-5">
            <h2 className="mb-4">Sign Up</h2>
            {user?.error?.message && 
            <div class="alert alert-danger" role="alert">
              {user?.error?.message}
            </div>}
            <form onSubmit={handleSubmit(handleRegisterSubmit)}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span> {/* Icon for username */}
                  </div>
                  <input {...registerInput('username')} type="text" className="form-control" id="username" placeholder="Enter username" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span> {/* Icon for first name */}
                    </div>
                    <input {...registerInput('first_name')} type="text" className="form-control" id="firstName" placeholder="Enter first name" required />
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-user"></i></span> {/* Icon for last name */}
                    </div>
                    <input {...registerInput('last_name')} type="text" className="form-control" id="lastName" placeholder="Enter last name" required />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span> {/* Icon for email */}
                  </div>
                  <input {...registerInput('email')} type="email" className="form-control" id="email" placeholder="Enter email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span> {/* Icon for password */}
                  </div>
                  <input {...registerInput('password')} type="password" className="form-control" id="password" placeholder="Enter password" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span> {/* Icon for confirm password */}
                  </div>
                  <input {...registerInput('confirm_password')} type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <div className="text-center mt-3">
              <p>Already have an account? <Link href="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

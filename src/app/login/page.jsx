"use client";

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "../../services/api";
import Error from "../components/Error";
import Link from "next/link";

const Login = () => {
  const {
    loading,
    user,
    error: apiError = "",
  } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loading && user && !user?.error?.message) {
      router.push("/plansAndPrices");
    }
  }, [loading, user, apiError]);

  const handleLoginSubmit = (data) => {
    const formData = { ...data }; // Get form data
    dispatch(login(formData));
  };
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
              {user?.error?.message && (
                <div class="alert alert-danger" role="alert">
                  {user?.error?.message}
                </div>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>{" "}
                      {/* Icon for username */}
                    </div>
                    <input
                      {...register("username")}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                    />
                    {errors.username && <span>{username} is required</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>{" "}
                      {/* Icon for password */}
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                    {errors.password && <span>{password} is required</span>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <Link href="/forgotPassword">Forgot Password?</Link>
              </div>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">
                Don't have an account? <Link href="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

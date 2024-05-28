"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import FormField from "../components/Form/FormField/FormField";
import { login } from "../../services/api";
import { LoginUserSchema } from "./loginSchema";

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
    setError,
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
  });

  // useEffect(() => {
  //   if (!loading && user && !user?.error?.message) {
  //     router.push("/plansAndPrices");
  //   }
  // }, [loading, user, apiError, router]);

  const handleLoginSubmit = (data) => {
    dispatch(login(data));
  };
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
              {user?.error?.message && (
                <div className="alert alert-danger" role="alert">
                  {user?.error?.message}
                </div>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <FormField
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    register={register}
                    error={errors.userName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <FormField
                    type="password"
                    placeholder="Password"
                    name="password"
                    register={register}
                    error={errors.password}
                  />
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
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import FormField from "../components/Form/FormField/FormField";
import { userRegister } from "../../services/api";
import { registerUserSchema } from "./registerUserSchema";

import Link from "next/link";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const { loading, user, error } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRegisterSubmit = async (data) => {
    delete data.password2;
    dispatch(userRegister(data));
  };

  useEffect(() => {
    if (!user?.error?.message && user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="text-center mt-5">
            <Image
              src="/assets/images/logo.svg"
              alt="Company Logo"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mt-5">
            <h2 className="mb-4">Sign Up</h2>
            {user?.error?.message && (
              <div className="alert alert-danger" role="alert">
                {user?.error?.message}
              </div>
            )}
            <form onSubmit={handleSubmit(handleRegisterSubmit)}>
              <div className="form-group">
                <label htmlFor="userName">Username</label>
                <FormField
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  register={register}
                  error={errors.username}
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="firstName">First Name</label>
                  <FormField
                    type="text"
                    placeholder="Enter first name"
                    name="first_name"
                    register={register}
                    error={errors.first_name}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="lastName">Last Name</label>
                  <FormField
                    type="text"
                    placeholder="Enter last name"
                    name="last_name"
                    register={register}
                    error={errors.last_name}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <FormField
                  type="email"
                  placeholder="Email"
                  name="email"
                  register={register}
                  error={errors.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <FormField
                  type="password"
                  placeholder="Password"
                  name="password"
                  register={register}
                  error={errors.password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <FormField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  register={register}
                  error={errors.password2}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Already have an account? <Link href="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

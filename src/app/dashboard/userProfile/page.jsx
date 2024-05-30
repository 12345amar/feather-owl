"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userProfile } from "@/services/api";
import FormField from "../../components/Form/FormField/FormField";
import { userProfileSchema } from "./userProfileSchema";
import DropdownField from "@/app/components/Form/DropdownField/Dropdown";
import { titleOptions } from "@/utils/constants";
import styles from "./page.module.css";

const UserProfile = () => {
  const { error: authError, loading: authLoading, user: authUser } = useSelector((state) => state.auth);
  const {  
    error: userProfileError,
    loading: userProfileLoading,
    userProfile: currentUserProfile
  } = useSelector((state) => state.userProfiles);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: authUser?.given_name,
      email: authUser?.email,
      title: currentUserProfile[0]?.title,
      birthDate: currentUserProfile[0]?.birthDate,
      cellPhoneNbr: currentUserProfile[0]?.cellPhoneNbr,
      address: currentUserProfile[0]?.address,
      city: currentUserProfile[0]?.city,
      zipCode: currentUserProfile[0]?.zipCode,
      country: currentUserProfile[0]?.country,
      preferredLanguage: currentUserProfile[0]?.preferredLanguage,
    },
  });

  const handleFormSubmission = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!authLoading && !authError && authUser) {
      dispatch(userProfile());
    }
  }, [authLoading, authError, authUser, userProfileError, dispatch]);

  return (
    <section className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="container">
            <h4 className="card-title">Profile Settings</h4>
            {(authLoading || userProfileLoading) && (
              <Spinner label="Loading..." />
            )}
            <div div className="row mt-5">
              <form onSubmit={handleSubmit(handleFormSubmission)}>
                <div className="col-sm">
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="userName">Username</label>
                      <FormField
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        register={register}
                        error={errors.username}
                        disabled
                      />
                    </div>
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
                    disabled
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="title">Title</label>
                    {/* <FormField
                      type="text"
                      placeholder="Enter Title"
                      name="title"
                      register={register}
                      error={errors.title}
                    /> */}
                    <DropdownField
                      name="title"
                      placeholder="Select Title"
                      options={titleOptions}
                      register={register}
                      error={errors.title}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="birthDate">Birth Date</label>
                    <FormField
                      type="data"
                      placeholder="Enter Birth Date"
                      name="birthDate"
                      register={register}
                      error={errors.birthDate}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="cellPhoneNbr">Phone Number</label>
                    <FormField
                      type="text"
                      placeholder="Enter Phone Number"
                      name="cellPhoneNbr"
                      register={register}
                      error={errors.cellPhoneNbr}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <FormField
                    type="text"
                    placeholder="Address"
                    name="address"
                    register={register}
                    error={errors.address}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <FormField
                    type="text"
                    placeholder="City"
                    name="city"
                    register={register}
                    error={errors.city}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <FormField
                    type="text"
                    placeholder="Zip Code"
                    name="zipCode"
                    register={register}
                    error={errors.zipCode}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <FormField
                    type="text"
                    placeholder="Country"
                    name="country"
                    register={register}
                    error={errors.country}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="preferredLanguage">Preferred Language</label>
                  <FormField
                    type="text"
                    placeholder="Preferred Language"
                    name="preferredLanguage"
                    register={register}
                    error={errors.preferredLanguage}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

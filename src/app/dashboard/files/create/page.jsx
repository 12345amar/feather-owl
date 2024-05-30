"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createFileStores, getUserSubscriptions } from "@/services/api";
import { useForm } from "react-hook-form";
import { createIdWithUrl } from "@/utils/constants";
import { operations } from "@/utils/apiUrls";


const Files = () => {
  const { createFile, loading: loadingFile } = useSelector((state) => state.files);
  const { userSubscriptions, loading: loadingUserSubscription } = useSelector((state) => state.subscription);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFileStoreSubmit = useCallback((formData) => {
    if (!userSubscriptions?.length) {
      dispatch(getUserSubscriptions());
      return
    }
    const subscriptionID = createIdWithUrl(operations.SUBSCRIPTIONS, userSubscriptions[0]?.subscriptionID)
    const createFileStoreDate = {
      ...formData,
      subscriptionID,
    }
    dispatch(createFileStores(createFileStoreDate));
  }, [userSubscriptions]);
  useEffect(() => {
    if (createFile && createFile?.fileStoreID) {
      router.push("/dashboard/files", { isFileCreated: true });
    }
  }, [createFile]);
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store &gt; Create File</h4>
          <div className="row file-add-cta"></div>
          <form
            className="form-sample"
            onSubmit={handleSubmit(handleFileStoreSubmit)}
          >
            {/* <p className="card-description">  </p> */}
            <div className="row">
              {createFile?.error?.message && (
                <div class="alert alert-danger" role="alert">
                  {user?.error?.message}
                </div>
              )}
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Storage Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      name="fileStoreName"
                      {...register("fileStoreName")}
                    />
                    {errors.fileStoreName && (
                      <span>File Store Name is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Storage Pool
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="storagePool"
                      {...register("storagePool")}
                    >
                      <option disabled>
                        Select storage pool
                      </option>
                      <option value="nfs">nfs - default</option>
                      <option value="hdd">hdd - slow</option>
                      <option value="ssd">ssd - fast</option>
                      <option value="nvme">nvme - super fast</option>
                    </select>
                    {errors.storagePool && (
                      <span>Storage Pool is required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Owner</label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      name="subscriptionID"
                      {...register("subscriptionID")}
                    >
                      <option disabled>
                        Add Users
                      </option>
                      <option value="self">Self</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">comment</label>
                  <div className="col-sm-9">
                    <input
                      {...register("comment")}
                      type="text"
                      className="form-control"
                      name="comment"
                    />
                    {errors.storagePool && <span>Comment is required</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Files;

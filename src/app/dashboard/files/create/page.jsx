"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createFileStores } from "@/services/api";
import { useForm } from "react-hook-form";

const Files = () => {
  const { auth, files, subscription } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
  const { userSubscriptions, loading: loadingUserSubscription } = subscription;
  const { loading: filesLoading, fileStores, createFile } = files;
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileStoreSubmit = (formData) => {
    const subscriptionID = `http://k8s.integration.feather-lab.com:32744/subscriptions/11/`;
    const createFileStoreDate = {
      ...formData,
      subscriptionID,
    };
    console.log(createFileStoreDate);
    dispatch(createFileStores(createFileStoreDate));
  };
  useEffect(() => {
    console.log("=========createFile", createFile);
    if (createFile && createFile?.fileStoreID) {
      router.push("/dashboard/files");
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
                      <option disabled selected>
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
                      <option disabled selected>
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

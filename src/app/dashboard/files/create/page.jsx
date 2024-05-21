"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFileStores } from "@/services/api";

const Files = () => {
  const { auth, files } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
  const { loading: filesLoading, fileStores } = files;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFileStores());
  }, []);
  console.log(
    "====fileStore=====s",
    filesLoading && userLoading && !fileStores?.length
  );
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store &gt; Create File</h4>
          <div className="row file-add-cta"></div>
          <form className="form-sample">
            {/* <p className="card-description">  </p> */}
            <div className="row">
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
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Storage Pool
                  </label>
                  <div className="col-sm-9">
                    <select className="form-select" name="storagePool">
                      <option disabled selected>
                        Select storage pool
                      </option>
                      <option value="nfs - default">nfs - default</option>
                      <option value="hdd - slow">hdd - slow</option>
                      <option value="ssd - fast">ssd - fast</option>
                      <option value="nvme - super fast">
                        nvme - super fast
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Owner</label>
                  <div className="col-sm-9">
                    <select className="form-select" name="storagePool">
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
                  <label className="col-sm-3 col-form-label">
                    Active File Store
                  </label>
                  <div className="col-sm-4">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isActiveFileStore"
                          id="isActiveFileStore1"
                          defaultValue
                          defaultChecked
                        />{" "}
                        Yes <i className="input-helper" />
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isActiveFileStore"
                          id="isActiveFileStore2"
                          defaultValue="option2"
                        />{" "}
                        No <i className="input-helper" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">comment</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
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

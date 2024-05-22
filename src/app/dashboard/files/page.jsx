"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getFileStores } from "@/services/api";
import { dataSizeType } from "@/utils/constants";

const Files = () => {
  const router = useRouter();
  const { auth, files } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
  const { loading: filesLoading, fileStores } = files;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFileStores());
  }, []);

  // const handleFileUpload = (fileStoreId) => {
  //   router.push({
  //     pathname: "/dashboard/files/upload",
  //     query: {
  //       fileStoreId,
  //     },
  //   });
  // };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store</h4>
          <div className="row file-add-cta">
            <span>
              <button type="button" class="btn btn-info">
                <Link
                  href="/dashboard/files/create"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <i className="fa fa-plus" /> Create New File Store
                </Link>
              </button>
            </span>
            <span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-gradient-primary py-3"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </span>
          </div>
          {filesLoading && userLoading && !fileStores?.length ? (
            <div style={{ height: "100vh", textAlign: "center" }}>
              Loading...
            </div>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    {" "}
                    <input type="checkbox" />{" "}
                  </th>
                  <th> Name </th>
                  <th> Owner </th>
                  <th> Size </th>
                  <th> Storage Pool </th>
                  <th> Upload </th>
                  <th> Permissions </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fileStores?.error?.message ? (
                  <tr>{fileStores?.error?.message}</tr>
                ) : (
                  fileStores?.map((value) => {
                    return (
                      <tr key={value.fileStoreID}>
                        <td>
                          {" "}
                          <input
                            type="checkbox"
                            value={value.fileStoreID}
                          />{" "}
                        </td>
                        <td> {value.fileStoreName} </td>
                        <td>{user?.given_name?.toUpperCase()}</td>
                        <td> {dataSizeType(value.currentSizeInByte)} </td>
                        <td> {value.storagePool}</td>
                        <td>
                          <Link
                            href={`/dashboard/files/upload/${value.fileStoreID}`}
                          >
                            <i className="fa fa-cloud-upload" />
                          </Link>
                        </td>
                        <td>
                          {" "}
                          <i className="fa fa-unlock-alt" />{" "}
                        </td>
                        <td>
                          {" "}
                          <i className="fa fa-pencil" />
                          <i
                            className="fa fa-trash-o"
                            style={{ marginLeft: "5px" }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;

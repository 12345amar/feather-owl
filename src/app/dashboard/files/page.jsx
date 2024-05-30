"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getFileStores, deleteFileStores, updateFileStores } from "@/services/api";
import { dataSizeType } from "@/utils/constants";
import Modal from "@/app/components/modal/Index";
import { CommonLoader } from "@/app/components/Loader";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { PrimaryButton, SearchBox } from "@fluentui/react";
import { clearCreateFile } from "@/redux/reducers/fileSlice";
import EditInfo from "@/app/components/modal/EditInfo";

const Files = () => {
  const router = useRouter();
  const pathState = useSearchParams()
  const { loading: userLoading, user } = useSelector((state) => state.auth);
  const { loading: filesLoading, fileStores, deleteFile, createFile, updateFile } = useSelector((state) => state.files);
  const [isModalShow, setIsModalShow] = useState(false);
  const [fileDeleteId, setFileDeleteId] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [fileStoreList, setFileStoreList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isEditInfoModalShow, setIsEditInfoModalShow] = useState(false);
  const [editFileStoreData, setEditFileStoreData] = useState({});
  
  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    dispatch(getFileStores());
  }, []);
  useEffect(() => {
    if (fileStores && fileStores.length) {
      setFileStoreList(fileStores);
    }
  }, [fileStores]);
  const searchBoxStyles = {
    root: { width: 300 },
  };
  const dropdownStyles = {
    dropdown: { width: 300 },
  };
  useEffect(() => {
    if (!deleteFile?.error?.message) {
      setIsMessage(deleteFile?.message);
      dispatch(getFileStores());
    }
    setIsModalShow(false);
  }, [deleteFile]);

  useEffect(() => {
    console.log("===updateFile", updateFile)
    if (!updateFile?.error?.message) {
      dispatch(getFileStores());
    }
    setIsEditInfoModalShow(false);
  }, [updateFile]);
  


  useEffect(() => {
    if (createFile && createFile?.fileStoreID) {
      setIsMessage("File Store has created successfully.");
      dispatch(clearCreateFile());
    }
  }, [createFile]);

  const deleteFileStoresEvent = (fileStoreID) => {
    setFileDeleteId(fileStoreID);
    setIsModalShow(true);
  };
  
  const editFileStoresEvent = (fileData) => {
    setEditFileStoreData({
          ...fileData
    })
    setIsEditInfoModalShow(true);
  }

  const deleteFileStoresModal = (fileStoreID) => {
    dispatch(deleteFileStores(fileStoreID));
  };
  const handleCreateFile = () => {
    route.push("/dashboard/files/create");
  };
  const handleSearch = (value) => {
    if (fileStores && fileStores.length && value) {
      fileStores.filter(
        (fObject) =>
          fObject.fileStoreName.toLowerCase().includes(value.toLowerCase()) ||
          fObject.storagePool.toLowerCase().includes(value.toLowerCase())
      );
      setFileStoreList(fileStores);
    }
  };

  useEffect(() => {
    console.log("======pathState", pathState)
  }, [pathState])
  
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store</h4>
          <div className="file-add-cta">
            <div>
              <SearchBox
                styles={searchBoxStyles}
                placeholder="Search"
                onEscape={(ev) => {
                  handleSearch("");
                }}
                onClear={(ev) => {
                  handleSearch("");
                }}
                onSearch={(newValue) => handleSearch(newValue)}
              />
            </div>
            <div>
              <PrimaryButton
                text="Create File Store"
                onClick={handleCreateFile}
              />
            </div>
          </div>
          {deleteFile?.error?.message && (
            <div class="alert alert-danger" role="alert">
              {deleteFile?.error?.message}
            </div>
          )}
           {updateFile?.error?.message && (
            <div class="alert alert-danger" role="alert">
              {updateFile?.error?.message}
            </div>
          )}

          {isMessage && isMessage && (
            <div class="alert alert-success" role="alert">
              {isMessage}
            </div>
          )}
          {filesLoading || userLoading ? (
            <Spinner label="Loading..." />
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
                  fileStoreList?.map((value) => {
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
                          <i className="fa fa-pencil"
                          onClick={() => {
                            editFileStoresEvent(value)
                          }} />
                          <i
                            className="fa fa-trash-o"
                            style={{ marginLeft: "5px" }}
                            onClick={() =>
                              deleteFileStoresEvent(value.fileStoreID)
                            }
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
      <Modal
        deleteEvent={() => deleteFileStoresModal(fileDeleteId)}
        cancelEvent={() => setIsModalShow(false)}
        isModalShow={isModalShow}
      />
      <EditInfo
        // handleFileStoreSubmit={editFileStoresModal}
        cancelEvent={() => setIsEditInfoModalShow(false)}
        editFileStoreData={editFileStoreData}
        isModalShow={isEditInfoModalShow}
      />
    </div>
  );
};

export default Files;

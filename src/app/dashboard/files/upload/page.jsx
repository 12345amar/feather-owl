"use client";
import { useState } from "react";
import {
  Dropdown,
  PrimaryButton,
  SearchBox,
  initializeIcons,
} from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@fluentui/react/lib/TextField";

import { uploadContent } from "@/services/api";
import styles from "./page.module.css";
// contentName                     : string - customer friendly name for content
// content                         : string - upload file path
// contentType                     : string - select predefined content type
// fileStore                       : integer - select upload permissioned file store
// customCustomer                  : string - free text ID for custom customer
// customOrder                     : string - free text ID for custom order
// comment                         : free text comment for content (max 255 char)

const dropdownStyles = {
  dropdown: { width: 300 },
};
const searchBoxStyles = {
  root: { width: 300 },
};

const FileUpload = () => {
  initializeIcons();
  const { auth, files } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
  const { loading: filesLoading, fileStores } = files;
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState({
    key: "",
    text: "",
  });

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const data = {
      contentName: file.name,
      content: file,
      contentType: "photo",
      fileStore: "http://k8s.integration.feather-lab.com:32744/filestores/35/",
      customCustomer:
        "http://k8s.integration.feather-lab.com:32744/subscriptions/11/",
      customOrder: "Hello World",
      comment: "Hello World",
    };
    console.log(data);
    dispatch(uploadContent(data));
    document.getElementById("Files").value = null;
  };

  const options = fileStores.map((fileStore) => {
    return {
      key: fileStore.fileStoreID,
      text: fileStore.fileStoreName,
    };
  });

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <section className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Upload</h4>
          <div className={styles.controlsContainer}>
            <div className="form-group">
              <Dropdown
                placeholder="Select File Store"
                options={options}
                styles={dropdownStyles}
                onChange={(e, item) => handleSelectFile(item)}
              />
            </div>
            <div className="form-group">
              <SearchBox styles={searchBoxStyles} placeholder="Search" />
            </div>
          </div>
          <div className={styles.fieldsContainer}>
            <div className="form-group">
              <label htmlFor={name}>Upload Files</label>
              <input
                type="file"
                id={"Files"}
                className="form-control"
                onChange={onChange}
                onDrag={onChange}
                multiple
              />
            </div>
            <div className="form-group">
              <TextField label="Add Tag Name/Value" />
            </div>
            <div className="form-group">
              <TextField label="Comment" multiline rows={3} />
            </div>
            <div className="form-group mt-5">
              <PrimaryButton onClick={handleUpload}>
                Upload File in Store
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;

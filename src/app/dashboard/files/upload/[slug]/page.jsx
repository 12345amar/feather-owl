"use client";
import { useState, useEffect } from "react";
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

const FileUpload = ({ params: { slug } }) => {
  initializeIcons();
  const { loading: userLoading, user } = useSelector((state) => state.auth);
  const { loading: filesLoading, fileStores } = useSelector((state) => state.files);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState({
    key: "",
    text: "",
  });
  const [fileUploadDetails, setFileUploadDetails] = useState({
    fileName: "",
    comment: "",
  });

  useEffect(() => {
    fileStores.find((fileStore) => {
      if (fileStore.fileStoreID === Number(slug)) {
        setSelectedFile({
          key: fileStore.fileStoreID,
          text: fileStore.fileStoreName,
        });
      }
    });
  }, [fileStores.length]);

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const data = {
      contentName: file.name,
      content: fileBuffer,
      contentType: "photo",
      fileStore: `http://k8s.integration.feather-lab.com:32744/filestores/${selectedFile.key}/`,
      customCustomer:
        "http://k8s.integration.feather-lab.com:32744/subscriptions/11/",
      customOrder: fileUploadDetails.fileName,
      comment: fileUploadDetails.comment,
    };
    dispatch(uploadContent(data));
    document.getElementById("Files").value = null;
    setFileUploadDetails({
      fileName: "",
      comment: "",
    });
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
                selectedKey={Number(slug)}
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
              <TextField
                label="Add Tag Name/Value"
                value={fileUploadDetails.fileName}
                onChange={(e, newValue) => {
                  setFileUploadDetails({
                    ...fileUploadDetails,
                    fileName: newValue,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Comment"
                multiline
                rows={3}
                value={fileUploadDetails.comment}
                onChange={(e, newValue) => {
                  setFileUploadDetails({
                    ...fileUploadDetails,
                    comment: newValue,
                  });
                }}
              />
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

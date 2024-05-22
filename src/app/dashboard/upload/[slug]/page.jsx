"use client";
import { useState, useEffect } from "react";
import { uploadContent } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "@fluentui/react";
import { useForm } from "react-hook-form";

// contentName                     : string - customer friendly name for content
// content                         : string - upload file path
// contentType                     : string - select predefined content type
// fileStore                       : integer - select upload permissioned file store
// customCustomer                  : string - free text ID for custom customer
// customOrder                     : string - free text ID for custom order
// comment                         : free text comment for content (max 255 char)

const FileUpload = ({ params: { slug } }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { contentupload } = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    console.log("==contentupload", contentupload);
  }, [contentupload]);
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
    // const formData = new FormData();

    // formData.append("contentName", file.name);
    // formData.append("content", file);
    // formData.append("contentType", "printjob");
    // formData.append(
    //   "fileStoreID",
    //   "http://k8s.integration.feather-lab.com:32744/filestores/35/"
    // );
    // formData.append(
    //   "customCustomer",
    //   "http://k8s.integration.feather-lab.com:32744/subscriptions/11/"
    // );
    // formData.append("customOrder", "Hello World");
    // formData.append("comment", "Hello World");
    console.log(data);
    dispatch(uploadContent(data));
    document.getElementById("Files").value = null;
  };
  return (
    <section className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Upload</h4>
          {contentupload?.error?.message && (
            <div class="alert alert-danger" role="alert">
              {contentupload?.error?.message}
            </div>
          )}
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
            <div className="form-group mt-5">
              <PrimaryButton onClick={handleUpload}>Upload</PrimaryButton>
            </div>
            {/* {error && <span className="text-danger">{error}</span>} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FileUpload;

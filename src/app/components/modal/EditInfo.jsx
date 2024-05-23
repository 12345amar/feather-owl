import React from 'react'
import { useForm } from "react-hook-form";

const EditInfo = ({
  cancelEvent = () => {},
  handleFileStoreSubmit = () => {},
  isModalShow = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div
        id="myModal"
        className={`modal fade-out ${
          isModalShow ? "in modal-on" : "modal-off"
        }`}
      >
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
              <label className="col-sm-12 col-form-label">
                        Old Name of File Store
                        <h4>Old FIle Name</h4>
                      </label>
              </div>

              <span
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={cancelEvent}
              >
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form
                className="form-sample"
                onSubmit={handleSubmit(handleFileStoreSubmit)}
              >
                {/* <p className="card-description">  </p> */}
                <div className="row">
                  {/* {createFile?.error?.message && (
                    <div class="alert alert-danger" role="alert">
                      {user?.error?.message}
                    </div>
                  )} */}
                  <div className="col-md-12">
                    <div className="form-group row">
                      
                      
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control"
                          name="fileStoreName"
                          {...register("fileStoreName")}
                          placeholder="Enter New File Store Name"
                        />
                        {errors.fileStoreName && (
                          <span>File Store Name is required</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="edit-info-modal-cta">
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInfo;

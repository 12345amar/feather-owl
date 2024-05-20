const Modal = ({
  cancelEvent = () => {},
  deleteEvent = () => {},
  isModalShow = false,
}) => {
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
                <i className="fa fa-times-circle-o" />
                <h4 className="modal-title">Are you sure?</h4>
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
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={cancelEvent}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteEvent}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

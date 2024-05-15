"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";
import { Checkbox } from "@fluentui/react/lib/Checkbox";

import { getFileStorePermissions } from "@/services/api";
import { dataSizeType } from "@/utils/constants";

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
};

const Permissions = () => {
  const [items, setItems] = React.useState([]);
  const [selection, setSelection] = React.useState(new Selection({}));
  const { auth, fileStorePermissions } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
  console.log(user);
  const { loading: filesPermissionLoading, userFileStorePermissions } =
    fileStorePermissions;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFileStorePermissions());
    if (userFileStorePermissions?.length) {
      const items = userFileStorePermissions.map((item) => {
        return {
          PermissionID: item?.permissionID,
          User: user?.username,
          FirstName: user?.given_name?.split(" ")[0].toUpperCase(),
          LastName: user?.family_name?.split(" ")[1].toUpperCase(),
          Comment: item?.comment,
          Write: item?.canWriteFiles,
          Delete: item?.canDeleteFiles,
          Upload: item?.canUploadFiles,
          Download: item?.canDownloadFiles,
        };
      });
      setItems(items);
    }
  }, [dispatch, user?.username, userFileStorePermissions?.length]);

  const columns = [
    {
      key: "column0",
      name: "Permission ID",
      fieldName: "PermissionID",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column1",
      name: "User",
      fieldName: "User",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "First Name",
      fieldName: "FirstName",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column3",
      name: "Last Name",
      fieldName: "LastName",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Comment",
      fieldName: "Comment",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    // {
    //   key: "column5",
    //   name: "Remove",
    //   fieldName: "Remove",
    //   minWidth: 100,
    //   maxWidth: 200,
    //   isResizable: true,
    // },
    // {
    //   key: "column6",
    //   name: "Read",
    //   fieldName: "Read",
    //   minWidth: 100,
    //   maxWidth: 200,
    //   isResizable: true,
    // },
    {
      key: "column7",
      name: "Write",
      fieldName: "Write",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Write} />;
      },
    },
    {
      key: "column8",
      name: "Download",
      fieldName: "Download",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Download} />;
      },
    },
    {
      key: "column9",
      name: "Upload",
      fieldName: "Upload",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Upload} />;
      },
    },
    {
      key: "column10",
      name: "Delete",
      fieldName: "Delete",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => {
        return (
          <input
            type="checkbox"
            checked={item.Delete}
            style={{
              "&checked": {
                backgroundColor: "#023047",
              },
            }}
          />
        );
      },
    },
  ];
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store Permissions</h4>
          <div className="row file-add-cta">
            <span>
              <button type="button" className="btn btn-info">
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
          {filesPermissionLoading &&
          userLoading &&
          !userFileStorePermissions?.length ? (
            <div style={{ height: "100vh", textAlign: "center" }}>
              Loading...
            </div>
          ) : (
            <MarqueeSelection selection={selection}>
              <DetailsList
                items={items}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selection={SelectionMode.none}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
                compact
              />
            </MarqueeSelection>
          )}
        </div>
      </div>
    </div>
  );
};

export default Permissions;

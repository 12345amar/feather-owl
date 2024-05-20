"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import { initializeIcons } from "@fluentui/react";
import { Spinner } from "@fluentui/react/lib/Spinner";

import { getFileStorePermissions } from "@/services/api";

const Permissions = () => {
  initializeIcons();
  const [items, setItems] = React.useState([]);
  const [originalItems, setOriginalItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { auth, fileStorePermissions } = useSelector((state) => state);
  const { loading: userLoading, user } = auth;
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
      setOriginalItems(items);
    }
  }, [userFileStorePermissions?.length]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setItems(originalItems);
    } else {
      const searchedValues = items.filter((item) => {
        return (
          item.User.toLowerCase().includes(searchTerm) ||
          item.FirstName.toLowerCase().includes(searchTerm) ||
          item.LastName.toLowerCase().includes(searchTerm)
        );
      });
      setItems(searchedValues);
    }
  };

  const handleSelectUser = (selectedUser) => {
    console.log(selectedUser);
    if (!selectedUser || !selectedUser.key || selectedUser.key === "Select") {
      setItems(originalItems);
      return;
    }
    const searchedValues = originalItems.filter((item) => {
      return item.User.toLowerCase().includes(selectedUser?.text.toLowerCase());
    });
    setItems(searchedValues);
  };

  const options = React.useMemo(
    () => [
      {
        key: "Select",
        text: "Select",
      },
      {
        key: user.username,
        text: user.username,
      },
    ],
    [user.username]
  );

  const handleAddUser = () => {
    console.log("Add User");
  };

  const columns = [
    {
      key: "column0",
      name: "Permission ID",
      fieldName: "PermissionID",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "column1",
      name: "User",
      fieldName: "User",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column2",
      name: "First Name",
      fieldName: "FirstName",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column3",
      name: "Last Name",
      fieldName: "LastName",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column4",
      name: "Comment",
      fieldName: "Comment",
      minWidth: 100,
      maxWidth: 300,
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
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Write} />;
      },
    },
    {
      key: "column8",
      name: "Download",
      fieldName: "Download",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Download} />;
      },
    },
    {
      key: "column9",
      name: "Upload",
      fieldName: "Upload",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) => {
        return <input type="checkbox" checked={item.Upload} />;
      },
    },
    {
      key: "column10",
      name: "Delete",
      fieldName: "Delete",
      minWidth: 50,
      maxWidth: 50,
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
  return userLoading || filesPermissionLoading ? (
    <Spinner label="Loading..." />
  ) : (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">File Store Permissions</h4>
          <div className="row file-add-cta">
            <span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="Search"
                  onChange={handleSearch}
                  name="search"
                  value={searchTerm}
                />
                {/* <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-gradient-primary py-3"
                    type="button"
                  >
                    Search
                  </button>
                </div> */}
              </div>
              <div className="input-group">
                <select placeholder="Select User">
                  <option value="Select">Select User</option>
                  {originalItems?.map((item) => {
                    return (
                      <option key={item.permissionID} value={item.permissionID}>
                        {item.User}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn btn-sm btn-gradient-primary py-3"
                  type="button"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>
            </span>
          </div>
          {filesPermissionLoading &&
          userLoading &&
          !userFileStorePermissions?.length ? (
            <Spinner label="Loading..." />
          ) : (
            <DetailsList
              items={items}
              columns={columns}
              setKey="none"
              layoutMode={DetailsListLayoutMode.justified}
              selection={SelectionMode.none}
              selectionPreservedOnEmptyClick={true}
              isHeaderVisible={true}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
            />
          )}
        </div>
      </div>
      <dialog open>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    </div>
  );
};

export default Permissions;

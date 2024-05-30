"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react/lib/DetailsList";
import {
  Dropdown,
  PrimaryButton,
  SearchBox,
  initializeIcons,
} from "@fluentui/react";
import styles from "./page.module.css";
import { Spinner } from "@fluentui/react/lib/Spinner";

import { getFileStorePermissions } from "@/services/api";

const searchBoxStyles = {
  root: { width: 300 },
};
const dropdownStyles = {
  dropdown: { width: 300 },
};

const Permissions = () => {
  initializeIcons();
  const [items, setItems] = React.useState([]);
  const [originalItems, setOriginalItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { loading: userLoading, user } = useSelector((state) => state.auth);
  const { loading: filesPermissionLoading, userFileStorePermissions } = useSelector((state) => state.fileStorePermissions);
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
  }, [
    auth,
    dispatch,
    user,
    userFileStorePermissions,
    userFileStorePermissions?.length,
  ]);

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
        key: user?.username,
        text: user?.username,
      },
    ],
    [user?.username]
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
    <section className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className={styles.permissionContainer}>
            <div>
              <div className={styles.permissionsControl}>
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
                <div className={styles.permissionsControl_inner}>
                  <Dropdown
                    placeholder="Select User"
                    options={options}
                    styles={dropdownStyles}
                    onChange={(e, item) => handleSelectUser(item)}
                  />
                  <PrimaryButton text="Add User" onClick={handleAddUser} />
                </div>
              </div>
            </div>
            <div>
              <DetailsList
                items={items}
                columns={columns}
                setKey="none"
                layoutMode={DetailsListLayoutMode.justified}
                selectionPreservedOnEmptyClick={true}
                isHeaderVisible={true}
                enterModalSelectionOnTouch={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Permissions;

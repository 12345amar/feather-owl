"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { dataSizeType } from "@/utils/constants";
import { useRouter } from "next/navigation";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react/lib/DetailsList";
import {
  Dropdown,
  PrimaryButton,
  SearchBox,
  initializeIcons,
} from "@fluentui/react";
import styles from "./page.module.css";

import { Spinner } from "@fluentui/react/lib/Spinner";

import { getFileStoreRecovery, updateFileStoreRecovery } from "@/services/api";
import { dateAndTimeFormat } from "@/utils/constants";
import { clearRecoverFile } from "@/redux/reducers/fileStoreRecoverySlice";

const searchBoxStyles = {
  root: { width: 300 },
};
const dropdownStyles = {
  dropdown: { width: 300 },
};

const RecycleBin = () => {
  const router = useRouter()
  const [items, setItems] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [originalItems, setOriginalItems] = React.useState([]);
  const { loading: userLoading, user } = useSelector((state) => state.auth);
  const { loading: fileStoreRecoverLoading, canRecoveredFiles, fileStoreRecovered } = useSelector((state) => state.fileStoreRecover);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFileStoreRecovery());
    initializeIcons()
  },[])
  useEffect(() => {
    if (canRecoveredFiles?.length) {
        const items = canRecoveredFiles.map((item) => {
        return {
          fileName: item?.fileStoreName,
          deletedBy: user?.given_name?.split(" ")[0].toUpperCase(),
          Size: dataSizeType(item?.currentSizeInByte),
          DeletedDate: dateAndTimeFormat(item?.lastChangeDate),
          recovery: item?.fileStoreID
        };
      });
      setItems(items);
      setOriginalItems(items);
    }
  }, [canRecoveredFiles?.length])
  
useEffect(() => {
    if (!fileStoreRecoverLoading && fileStoreRecovered?.code) {
      dispatch(clearRecoverFile())
      router.push('/dashboard/files', {isFileRecovered: true, message: fileStoreRecovered.message })
    }
}, [fileStoreRecoverLoading, fileStoreRecovered])
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setItems(originalItems);
    } else {
      const searchedValues = items.filter((item) => {
        return (
          item.fileName.toLowerCase().includes(value) ||
          item.deletedBy.toLowerCase().includes(value) ||
          item.DeletedDate.toLowerCase().includes(value)
        );
      });
      setItems(searchedValues);
    }
  };
const recoveryFileHandle = (fileStoreId) => {
  const recycleBinParams = {
    recoverFileStore: true,
    id: fileStoreId
  } 
  dispatch(updateFileStoreRecovery(recycleBinParams))
}
  const columns = [
    {
      key: "column0",
      name: "File Name",
      fieldName: "fileName",
      minWidth: 150,
      maxWidth: 150,
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
      key: "column1",
      name: "Deleted By",
      fieldName: "deletedBy",
      minWidth: 150,
      maxWidth: 150,
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
      name: "Size",
      fieldName: "Size",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted 0 to 9",
      sortDescendingAriaLabel: "Sorted 9 to 0",
      data: "string",
      isPadded: true,
    },
    {
      key: "column3",
      name: "Deleted Date & Time",
      fieldName: "DeletedDate",
      minWidth: 200,
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
      key: "column4",
      name: "Recovery",
      fieldName: "recovery",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item) => {
        return <a href="#" onClick={() => { recoveryFileHandle(item.recovery)}} ><i className="fa fa-history" style={{fontSize: "14px"}} /></a>;
      },
    }
  ];

return (
    <section className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className={styles.permissionContainer}>
            <div>
            { fileStoreRecovered?.error?.message && 
              <div className="alert alert-danger" role="alert">
                {user?.error?.message}
              </div>
            }
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
                  onSearch={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div>
            {userLoading || fileStoreRecoverLoading ? (
  <Spinner label="Loading..." />
) : (
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
              />)}
            </div>
          </div>
        </div>
      </div>
    </section>)
};

export default RecycleBin;

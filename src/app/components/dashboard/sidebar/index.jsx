"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const SideBar = () => {
  const { loading, user, error: apiError } = useSelector((state) => state.auth);

  const handleToggleNavigation = (e) => {
    e.preventDefault();
    const target = e.target;
    const parent = target.parentElement;
    const li = parent.parentElement;
    const subMenu = li.querySelector(".collapse");
    const allToggles = document.querySelectorAll(".collapse.show");

    for (let i = 0; i < allToggles.length; i++) {
      if (allToggles[i] !== subMenu) {
        allToggles[i].classList.remove("show");
      }
    }

    subMenu.classList.toggle("show");
  };

  const handleContentToggleNavigation = (e) => {
    e.preventDefault();
    const target = e.target;
    const parent = target.parentElement;
    const li = parent.parentElement;
    const subMenu = li.querySelector(".collapse");
    const allToggles = document.querySelectorAll(".collapse.show");
    for (let i = 0; i < allToggles.length; i++) {
      if (allToggles[i] !== subMenu) {
        allToggles[i].classList.remove("show");
      }
    }
    subMenu.classList.toggle("show");
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <Link href="/dashboard/userProfile" className="nav-link">
            <div className="nav-profile-image">
              <span className="font-weight-bold mb-2">
                {user?.given_name?.toUpperCase()}
              </span>
              <br />
              <span className="text-secondary text-small">{user?.email}</span>
              <span className="login-status online" />
            </div>
            <div className="nav-profile-text d-flex flex-column"></div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/dashboard">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-home menu-icon" />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            data-bs-toggle="collapse"
            href=""
            aria-expanded="false"
            aria-controls="ui-basic"
            onClick={handleToggleNavigation}
          >
            <span className="menu-title">File Store</span>
            <i className="fa fa-folder-o menu-icon" />
          </Link>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/files">
                  Files
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/permissions">
                  Permissions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/recycleBin">
                  Recycle Bin
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            data-bs-toggle="collapse"
            href=""
            aria-expanded="false"
            aria-controls="ui-basic"
            onClick={handleContentToggleNavigation}
          >
            <span className="menu-title">Content</span>
            <i className="fa fa-files-o menu-icon" />
          </Link>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/content">
                  Thumbnails
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/content/tags">
                  Tags
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/dashboard/content/contentTags"
                >
                  Content Tags
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/content/recyleBin">
                  Recycle Bin
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;

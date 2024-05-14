"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link"

const SideBar = () => {
    const { loading, user, error: apiError } = useSelector(
        (state) => state.auth
      )
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item nav-profile">
              <Link href="/dashboard" className="nav-link">
                <div className="nav-profile-image">
                <span className="font-weight-bold mb-2">{user?.given_name?.toUpperCase()}</span><br />
                  <span className="text-secondary text-small">{user?.email}</span>
                  {/* <img src="assets/images/faces/face1.jpg" alt="profile" /> */}
                  <span className="login-status online" />
                  {/*change to offline or busy as needed*/}
                </div>
                <div className="nav-profile-text d-flex flex-column">
                
                </div>
                {/* <i className="mdi mdi-bookmark-check text-success nav-profile-badge" /> */}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard">
              
                <span className="menu-title">Dashboard</span>
                <i className="mdi mdi-home menu-icon" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                <span className="menu-title">File Store</span>
                <i className="menu-arrow" />
                <i className="fa fa-folder-o" />
                
               
              </Link>
              <div className="collapse" id="ui-basic">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/files">Files</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/permissions">Permissions</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/dashboard/recyleBin">Recycle Bin</Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                <span className="menu-title">Icons</span>
                <i className="mdi mdi-contacts menu-icon" />
              </a>
              <div className="collapse" id="icons">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#forms" aria-expanded="false" aria-controls="forms">
                <span className="menu-title">Forms</span>
                <i className="mdi mdi-format-list-bulleted menu-icon" />
              </a>
              <div className="collapse" id="forms">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/forms/basic_elements.html">Form Elements</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                <span className="menu-title">Charts</span>
                <i className="mdi mdi-chart-bar menu-icon" />
              </a>
              <div className="collapse" id="charts">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                <span className="menu-title">Tables</span>
                <i className="mdi mdi-table-large menu-icon" />
              </a>
              <div className="collapse" id="tables">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                <span className="menu-title">User Pages</span>
                <i className="menu-arrow" />
                <i className="mdi mdi-lock menu-icon" />
              </a>
              <div className="collapse" id="auth">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/samples/login.html"> Login </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/samples/register.html"> Register </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/samples/error-404.html"> 404 </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="pages/samples/error-500.html"> 500 </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="docs/documentation.html" target="_blank">
                <span className="menu-title">Documentation</span>
                <i className="mdi mdi-file-document-box menu-icon" />
              </a>
            </li> */}
          </ul>
        </nav>
    )
}

export default SideBar
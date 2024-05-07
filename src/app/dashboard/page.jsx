'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import Link from "next/link"
import { useRouter  } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../redux/reducers/authSlice"
import Header from '../components/dashboard/header';
import SideBar from '../components/dashboard/sidebar';
import Footer from '../components/dashboard/footer';

const Dashboard = () => {
    const { loading, user, error: apiError } = useSelector(
        (state) => state.auth
      )
      const router = useRouter();
      const dispatch = useDispatch();
console.log("===user", user)
// useEffect(() => {
//   if (!loading && !user) {
//       router.push('/login');
//   }
// }, [loading, user])
const handleLogout = async () => {
    dispatch(logoutUser())
    localStorage.clear();
    sessionStorage.clear();
    if (caches) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
      
    router.push('/login');
  }
  return (
  
    
          <><div className="container-scroller">

      {/* partial:partials/_navbar.html */}
     <Header />
      {/* partial */}
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_sidebar.html */}
        <SideBar />
        {/* partial */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-home" />
                </span> Dashboard
              </h3>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                  </li>
                </ul>
              </nav>
            </div>
               
          </div>
          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <Footer />
          {/* partial */}
        </div>
      </div>

    </div><script src="assets/vendors/js/vendor.bundle.base.js" /><script src="assets/vendors/chart.js/chart.umd.js"></script><script src="assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js" /><script src="assets/js/off-canvas.js" /><script src="assets/js/misc.js" /><script src="assets/js/settings.js" /><script src="assets/js/todolist.js" /><script src="assets/js/jquery.cookie.js" /><script src="assets/js/dashboard.js" /></>
    // <div className="container forgot-container">
    //   <div> <button onClick={handleLogout} className="btn btn-white">Logout</button></div>
    //   <div className="row justify-content-center">
    //     <div className="col-md-6">
    //       <div className="card">
    //         <div className="card-header">
    //           <h3 className="text-center">Dashboard</h3>
    //         </div>
    //         <div className="card-body">
    //          <p>email: {user?.email}</p>
    //          <p>Username: {user?.username}</p>
    //          <p>sub: {user?.subUser}</p>
    //          <p>given_name: {user?.given_name}</p>
    //          <p>family_name: {user?.family_name}</p>
    //          <p>exp: {user?.exp}</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dashboard;
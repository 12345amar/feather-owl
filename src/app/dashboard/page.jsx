'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import Link from "next/link"
import { useRouter  } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../redux/reducers/authSlice"

const Dashboard = () => {
    const { loading, user, error: apiError } = useSelector(
        (state) => state.auth
      )
      const router = useRouter();
      const dispatch = useDispatch();

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
    <div className="container forgot-container">
      <div> <button onClick={handleLogout} className="btn btn-white">Logout</button></div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Dashboard</h3>
            </div>
            <div className="card-body">
             <p>email: {user?.email}</p>
             <p>Username: {user?.username}</p>
             <p>sub: {user?.subUser}</p>
             <p>given_name: {user?.given_name}</p>
             <p>family_name: {user?.family_name}</p>
             <p>exp: {user?.exp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
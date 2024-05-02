'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import Link from "next/link"
import { useRouter  } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const { loading, user, error: apiError } = useSelector(
        (state) => state.auth
      )
      const router = useRouter();

      useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
      }, [loading, user])
     
  return (
    <div className="container forgot-container">
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
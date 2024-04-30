'use client';
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const { loading, user, error: apiError } = useSelector(
        (state) => state.auth
      )
      const {
        aud,
        aut,
        azp,
        client_id,
        email,
        exp,
        family_name,
        given_name,
        iat,
        iss,
        jti,
        nbf,
        roles,
        scope,
        sub: subUser,
        tokenExpireTime,
        username
      } = user
  return (
    <div className="container forgot-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Dashboard</h3>
            </div>
            <div className="card-body">
             <p>email: {email}</p>
             <p>Username: {username}</p>
             <p>sub: {subUser}</p>
             <p>given_name: {given_name}</p>
             <p>family_name: {family_name}</p>
             <p>exp: {exp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
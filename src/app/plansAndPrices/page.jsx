'use client';

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter  } from 'next/navigation'
import { login } from '../../services/api';
import Error from '../components/Error'
import Link from "next/link"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


const PlansAndPrices = () => {
//   const { loading, user, error: apiError } = useSelector(
//     (state) => state.auth
//   )
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()
 
 
//   useEffect(() => {
//     if(!loading && apiError?.message) {
//       return false
//     }
//     if (!loading && !user?.error?.message && user) {
//       router.push('/dashboard');
//     }
//   }, [loading, user, apiError])

//   const handleLoginSubmit = (data) => {
//     const formData = { ...data }; // Get form data
//     dispatch(login(formData))
//   }
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
               
                <Nav variant="pills" className="flex-row">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Row>
                <Row>
                <Tab.Content>
                    <Tab.Pane eventKey="first">First tab content</Tab.Pane>
                    <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                </Tab.Content>
                
            </Row>
            </Tab.Container>
        {/* <div className="col-md-6">

          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Plans and Prices</h3>
              
            </div>

          



            <div className="card-body">
              
              <div className="text-center mt-3">
                <Link href="/forgotPassword">Forgot Password?</Link>
              </div>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Don't have an account? <Link href="/signup">Sign up</Link></p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PlansAndPrices;

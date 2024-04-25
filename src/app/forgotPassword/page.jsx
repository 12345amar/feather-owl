/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="container forgot-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Forgot Password</h3>
            </div>
            <div className="card-body">
              <p className="text-center">Enter your email address below and we'll send you a link to reset your password.</p>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    </div>
                    <input type="email" className="form-control" id="email" placeholder="Email address" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block"><i className="fas fa-paper-plane"></i> Send Reset Link</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p className="mb-0">Remembered your password? <a href="/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
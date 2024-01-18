import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorPage = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="display-4 mb-3">Page Not Found</h2>
      <p className="lead mb-4">Oops! The page you are looking for might be in another castle.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;

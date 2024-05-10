import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <div className="d-flex justify-content-center border">
        <div className="row">
          <h1 className="text-center p-2 w-75">Welcome To Our Page</h1>
        </div>
      </div>
      <Link to="/dashboard" className="ms-4 mt-4">
        <span className="fw-bold btn btn-outline-dark">
          <i className="text-center text-dark mx-2"></i>
          DashBoard
        </span>
      </Link>
    </>
  );
};

export default Index;

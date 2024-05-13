import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className="row">
          <h1 className="text-center p-2">Welcome To Our Page</h1>
        </div>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Task Management Task</h1>
          <p className="col-md-8 fs-4">
            We're thrilled to have you on board and excited for you to experience the power of efficient task management. Whether you're a seasoned pro or just starting out, our platform is designed to streamline your workflow, boost productivity, and bring your projects to new heights.
          </p>
          <Link to="/dashboard" className="ms-4 mt-4">
        <span className="fw-bold btn btn-outline-dark">
          <i className="text-center text-dark mx-2"></i>
          DashBoard
        </span>
      </Link>
        </div>
      </div>
      
      
    </>
  );
};

export default Index;

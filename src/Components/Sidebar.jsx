import React from "react";
import '../Style/SideBar.css'
import { Outlet,Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { SignOut } from "../Redux/DataSlice";
import Login from "./Login";

const SideBar = ({IsLogIn}) => {
    
    
    const dispatch = useDispatch()

  return (
    <div className="container-fluid m-1">
      <div className="row">
        <div className="bg-dark sidebar col-3 min-vh-100 d-flex justify-content-between flex-column rounded-3">
          <div className="mt-2">
            <a className="text-decoration-none ms-3 d-sm-inline text-white d-flex align-items-center">
              <i className="fs-3 bi bi-list gap-2 "></i>
              <span className="d-none d-sm-inline">
                Task Management
              </span>
              
            </a>

            <hr className="text-white" />
            <ul className="nav nav-pills flex-column mt-4">
              <li className="nav-item ">
                <a
                  href="#"
                  className="nav-link text-white "
                  aria-current="page"
                >
                  <i className="bi bi-speedometer gap-2 fs-5"></i>
                  <span className="ms-3 d-none d-sm-inline">DashBoard</span>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link text-white ">
                <i className="bi bi-house-door-fill fs-5"></i>
                  <span className="ms-3 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link text-white ">
                    <i className="bi bi-card-checklist fs-5"></i>
                  <span className="ms-3 d-none d-sm-inline">Task</span>
                </a>
              </li>
            </ul>
          </div>
          
          {
            IsLogIn?(<div className="dropdown mb-4">
            <hr className="text-white"/>
            <a
              href="#"
              className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle text-white"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong className="d-none d-sm-inline">mdo</strong>
            </a>
            <ul
              className="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser2"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" onClick={()=>{
                    dispatch(SignOut())
                }}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>):(
            <div className="d-flex mb-4 justify-content-center">
                <i className="bi bi-person-fill-add me-3 d-sm-none text-white fs-2"></i>
                <Link to="/login" className="btn btn-light d-none d-sm-inline w-75">
                    <span className="fw-bold">SIGN IN</span>
                </Link>

            </div>
          )
          }
        </div>
        <div className="col-9">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

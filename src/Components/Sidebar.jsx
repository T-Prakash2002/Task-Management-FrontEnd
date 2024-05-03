import React from "react";
import "../Style/SideBar.css";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOut } from "../Redux/DataSlice";
import Login from "./Login";

const SideBar = ({ IsLogIn }) => {
  const user = localStorage.getItem("login");
  const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 min-vh-100 sidebar d-flex justify-content-between flex-column">
          <div className="mt-2">
            <a className="text-decoration-none ms-3 d-sm-inline text-white d-flex align-items-center">
              <i className="fs-3 bi bi-list gap-2 "></i>
              <span className="d-none d-sm-inline">Task Management</span>
            </a>

            <hr className="text-white" />
            {IsLogIn ? (
              <ul className="nav nav-pills flex-column mt-4">
                <li className="nav-item ">
                  <NavLink
                    to={"/dashboard"}
                    className="nav-link text-white "
                    aria-current="page"
                  >
                    <i className="bi bi-speedometer fs-5"></i>
                    <span className="ms-2 d-none d-sm-inline">DashBoard</span>
                  </NavLink>
                </li>
                {/* <li className="nav-item ">
                  <a href="#" className="nav-link text-white ">
                    <i className="bi bi-house-door-fill fs-5"></i>
                    <span className="ms-3 d-none d-sm-inline">Home</span>
                  </a>
                </li> */}
                <li className="nav-item ">
                  <NavLink to={"/task"} className="nav-link text-white ">
                    <i className="bi bi-card-checklist fs-5"></i>
                    <span className="ms-3 d-none d-sm-inline">Task</span>
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>

          {IsLogIn ? (
            <div className="dropdown mb-4">
              <hr className="text-white" />
              <a
                href="#"
                className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle text-white"
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="profile-img me-3 px-2 ">
                  {user.charAt(0).toUpperCase()}
                </span>
                <strong className="d-none d-sm-inline">{user}</strong>
              </a>
              <ul
                className="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser2"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(SignOut());
                    }}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex mb-4 justify-content-center">
              {/* <Link to="/login" className=" d-sm-none">
                
              </Link> */}

              <Link to="/login" className="w-75">
                <i className="bi bi-person-fill-add me-3 d-sm-none text-white fs-2"></i>
                <span className="fw-bold d-none d-sm-inline btn btn-light">
                  SIGN IN
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="col-9">
          <div className="container border min-vh-100 min-vw-100 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

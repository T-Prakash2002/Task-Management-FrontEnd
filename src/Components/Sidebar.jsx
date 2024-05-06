import React from "react";
import "../Style/SideBar.css";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOut } from "../Redux/DataSlice";
import { useNavigate } from "react-router-dom";
import { encryptStorage1 } from "../Encrypt/Encrpt";

import Login from "./Login";

const SideBar = ({ IsLogIn }) => {
  const user = useSelector((state) => state.LoginDetails.LogInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const val1 = encryptStorage1.getItem("user");

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="text-white text-muted">Task Management</i>
          </a>
          <button
            className="navbar-toggler btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="bi bi-three-dots fs-6"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {IsLogIn?(
              <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <NavLink to={"/dashboard"} className="nav-link text-white">
                  <i className="bi bi-speedometer fs-5"></i>
                  <span className=" mx-2">DashBoard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/task"} className="nav-link text-white ">
                  <i className="bi bi-card-checklist fs-5"></i>
                  <span className="mx-2">Task</span>
                </NavLink>
              </li>
            </ul>
            ):''
            }

            {IsLogIn ? (
              <div className="dropdown ms-auto">
                <a
                  href="#"
                  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle text-white"
                  id="dropdownUser2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="profile-img me-3 px-2 ">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                  <strong className=" d-sm-inline">{user.username}</strong>
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
                        navigate("/");
                      }}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <Link to="/login" className=" d-sm-none"></Link>

                <Link to="/login">
                  <span className="fw-bold btn btn-light">
                    <i className="bi bi-person-fill-add me-3 text-dark mx-2"></i>
                    SIGN IN
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Outlet */}
      <div className="row">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

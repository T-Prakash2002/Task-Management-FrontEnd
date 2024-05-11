import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const user =
    useSelector((state) => state.LoginDetails.LogInUser) ||
    encryptStorage1.getItem("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return <div>

  </div>;
};



export default AddTask;

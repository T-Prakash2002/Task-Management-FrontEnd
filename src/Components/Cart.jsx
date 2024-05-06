import React, { useState,useEffect } from "react";
import "../Style/Cart.css";
import EditTask from "./EditTask";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";
import { apiuri } from "../constants";
import axios from "axios";

const Cart = ({ data }) => {
  const selectedDate = new Date(data.TaskDueDate);
  const currentDate = new Date();

  const differenceInMilliseconds = Math.abs(selectedDate - currentDate);
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  const navigate = useNavigate();


//   const [AllMembers, setAllMembers] = useState([]);
//   const dispatch = useDispatch();
//   const [selectMembers, setSelectMembers] = useState([]);
//      const user = useSelector((state) => state.LoginDetails.LogInUser);
//   const IsLogIn = useSelector((state) => state.LoginDetails.IsLogIn);
// 
// 
// 
// 
//   useEffect(() => {
//     if (user.role === "Admin") {
//       axios
//         .get(`${apiuri}/getMemberList`)
//         .then(({ data }) => {
//           setAllMembers(data);
//           dispatch(GetMemberList({ data: data }));
//         })
//         .catch((err) => {
//           if (err.toJSON().message === "Network Error") {
//             alert("Connection is Poor!!,Chek your Connection");
//           }
//         });
//     }
//   }, []);

  return (
    <>
      <div className="card">
        <sup>{differenceInDays} days pending</sup>
        <h3 className="text-center">{data.Task_Name}</h3>
        <div className="card-body">
          <div className="card-text small">
            <strong>Assigner_Name:</strong>
            <span>{data.Assigner_Name}</span>
          </div>

          <div className="fw-bolder fs-5">
            <sub className="d-flex gap-2">
              <i
                className="bi bi-pencil-square btn"
                onClick={()=>{
                    navigate(`/editTask/${data}`)
                }}
              ></i>

              <i className="bi bi-trash" onClick={async(e)=>{
                const dbResponse=await axios.delete(`${apiuri}/`)
              }}>

              </i>

              <i className="bi bi-info-circle"></i>
            </sub>
          </div>

          {/* Edit Task */}



          {/* ------------------------------------------------------------------------------------------- */}
        </div>
      </div>
    </>
  );
};

export default Cart;

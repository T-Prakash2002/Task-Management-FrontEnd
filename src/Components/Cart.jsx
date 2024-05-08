import React, { useState, useEffect } from "react";
import "../Style/Cart.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { apiuri } from "../constants";
import axios from "axios";
import { EditTask } from "../Redux/DataSlice";

const Cart = ({ data,index,setAllMembers, setAllTasks, TaskList }) => {

  function differenceInDay(data){


  const endDate = new Date(data.TaskDueDate);
  const startDate = Date.now(); // Current date and time in milliseconds

// Calculate the time difference in milliseconds
const timeDifferenceMS = endDate-startDate;

// Calculate the elapsed time in seconds, minutes, hours, and days
const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
const timeDifferenceMins = Math.floor(timeDifferenceMS / 60000);
const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
const differenceInDays = Math.floor(timeDifferenceMS / 86400000);


// console.log(`Time difference in minutes: ${timeDifferenceMins}`);
// console.log(`Time difference in days: ${differenceInDays}`);

  return differenceInDays;
  }
  
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const user = useSelector((state) => state.LoginDetails.LogInUser);

  useEffect(() => {
    if (user.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`)
        .then(({ data }) => {
          setAllMembers(data);
        })
        .catch((err) => {
          if (err.toJSON().message === "Network Error") {
            alert("Connection is Poor!!,Check your Connection");
          }
        });

      axios.get(`${apiuri}/getTaskList`).then(({ data }) => {
        
        setAllTasks(data);
      });
    }
    if (user.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${user.username}`)
        .then(({ data }) => {
          setAllTasks(data);
          
          console.log("taskmember");
        });
    }
  }, []);


  return (
    <>
      <div className="card" key={index}>
          <sup>
            <i
              className={
                data.Priority == "Priority"
                  ? "text-danger fw-bold bi bi-circle-fill mx-2"
                  : data.Priority == "Important"
                  ? "text-success fw-bold bi bi-circle-fill mx-2"
                  : "text-primary fw-bold bi bi-circle-fill mx-2"
              }
            ></i>
            {differenceInDay(data)} days pending
          </sup>
          <h3 className="text-center">{data.Task_Name}</h3>
          <div className="card-body">
            <div className="card-text small d-flex justify-content-around">
              <strong>Assigner_Name:</strong>
              <span>{data.Assigner_Name}</span>
            </div>
            <div className="card-text small d-flex justify-content-around">
              <strong>Allocated_Member:</strong>
              <span className="items">
                {
                data.Assigned_members.map((list,index)=>{
                  return <span className="item" key={index}>{list}</span>
                })}
              </span>
              
              
              
            </div>
            <div className="card-text small d-flex justify-content-around">
              <strong>Priority Status:</strong>
              <span
                className={
                  data.Priority == "Priority"
                    ? "text-danger fw-bold"
                    : data.Priority == "Important"
                    ? "text-success fw-bold"
                    : "text-primary fw-bold"
                }
              >
                {data.Priority}
              </span>
            </div>

            <div className="fw-bolder fs-5">
              <sub className="d-flex gap-2">
                <i
                  className="bi bi-pencil-square btn"
                  onClick={() => {
                    dispatch(EditTask(data))
                    navigate(`/EditTask`);
                  }}
                ></i>

                <i
                  className="bi bi-trash btn"
                  onClick={async (e) => {

                    if(user.role==="Admin"){
                      const apiRes=await axios.delete(
                      `${apiuri}/deleteParticularTask/${data._id}`
                    );
                    if(apiRes!="Deleted Failed"){
                        alert("Deleted Success");
                        window.location.reload();
                    }else{
                      alert("Delete Failed")
                    }
                    }
                  }}
                ></i>

                <i
                  className="bi bi-info-circle btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                ></i>
              </sub>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="..."
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        {data.Task_Name}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p>{data.Description}</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Task */}

            {/* ------------------------------------------------------------------------------------------- */}
          </div>
        </div>
    </>
  );
};

export default Cart;

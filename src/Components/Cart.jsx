import React, { useState, useEffect } from "react";
import "../Style/Cart.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { apiuri } from "../constants";
import axios from "axios";
import { EditTask, AboutTask,deleteTask } from "../Redux/DataSlice";

const Cart = ({ data, index, setAllMembers, setAllTasks, TaskList }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(data.taskStatus);
  const { LogInUser, IsLogIn, Token } = useSelector(
    (state) => state.LoginDetails
  );

  const user = useSelector((state) => state.LoginDetails.LogInUser);
  const token = useSelector((state) => state.LoginDetails.Token);
  const info = useSelector((state) => state.LoginDetails?.InfoTask);


  useEffect(() => {
    if (LogInUser.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`, {
          headers: {
            auth: token,
          },
        })
        .then(({ data }) => {
          setAllMembers(data);
        })
        .catch((err) => {
          console.log("Connection is Poor!!,Check your Connection");
        });
      axios
        .get(`${apiuri}/getTaskList`, {
          headers: {
            auth: token,
          },
        })
        .then(({ data }) => {
          setAllTasks(data);
        })
        .catch((err) => {
          console.log("Connection is Poor!!,Check your Connection");
        });
    }
    if (LogInUser.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${LogInUser.username}`, {
          headers: {
            auth: token,
          },
        })
        .then(({ data }) => {
          setAllTasks(data);
        });
    }
  }, [status]);

  function differenceInDay(data) {
    const endDate = new Date(data.TaskDueDate);
    const startDate = Date.now();
    const timeDifferenceMS = endDate - startDate;

    const differenceInDays = Math.floor(timeDifferenceMS / 86400000);

    if (differenceInDays == 1 || differenceInDays == 0) {
      if (data?.Priority != "Priority") {
        let r = true;
        handleupdatePriority(data._id, r);
      }
    }
    if(differenceInDays <0){
      return "Overdue Task"
    }
    return (differenceInDays+" days pending");
  }

  async function handleupdatePriority(id, r) {
    await axios
      .put(
        `${apiuri}/handleupdatePriority/${id}`,
        {
          Priority: "Priority",
          reminder: r,
        },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then(({ data }) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChangeStatus = async (val, id) => {
    let remin = false;
    if (val == "Completed") {
      remin = false;
    } else {
      remin = true;
    }

    const apiRes = await axios.put(
      `${apiuri}/updateStatus/${id}`,
      {
        taskStatus: val,
        reminder: remin,
      },
      {
        headers: {
          auth: token,
        },
      }
    );

    if (apiRes.data !== "Update Failed") {
      console.log("Successfully Update");
    } else {
      console.log("Update Failed");
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card p-3" key={index}>
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
          {differenceInDay(data)}
        </sup>
        <h3 className="text-center">{data.Task_Name}</h3>
        <div className="">
          <div>
            <strong>Assigner_Name:</strong>
            <span>{data.Assigner_Name}</span>
          </div>
          {/* <div className="card-text small d-flex justify-content-around">
            <strong>Allocated_Member:</strong>
            <span className="items">
              {data.Assigned_members.map((list, index) => {
                return (
                  <span className="item" key={index}>
                    {list}
                  </span>
                );
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
          </div> */}

          <div className="">
            <strong>Status:</strong>
            <select
              value={status}
              className="dropdown-toggle bg-outline-warning ms-2"
              onChange={async (e) => {
                setStatus(e.target.value);
                handleChangeStatus(e.target.value, data._id);
              }}
            >
              <option className="dropdown-item " value="Pending">
                Pending
              </option>
              <option className="dropdown-item " value="Progress">
                Progress
              </option>
              <option className="dropdown-item" value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="fw-bolder fs-5">
            <sub className="d-flex gap-2">

              {(LogInUser.role=="Admin" || LogInUser.editTask)?(
                <i
                className="bi bi-pencil-square btn"
                title="Edit"
                onClick={() => {
                    dispatch(EditTask(data));
                    navigate(`/EditTask`);
                }}
              ></i>
              ):''}
                
              
              {(LogInUser.role=="Admin" || LogInUser.deleteTask)?(

                <i
                className="bi bi-trash btn"
                title="Delete"
                onClick={async (e) => {
                  
                    const apiRes = await axios.delete(
                      `${apiuri}/deleteParticularTask/${data._id}`,
                      {
                        headers: {
                          auth: token,
                        },
                      }
                    );
                    if (apiRes != "Deleted Failed") {
                      
                      dispatch(deleteTask({id:data._id}))
                      alert("Deleted Success");
                    } else {
                      alert("Delete Failed");
                    }
                }}
              ></i>
               ):''}
              
              {(LogInUser.role=="Admin" || LogInUser.viewTask)?(
                <i
                className="bi bi-info-circle btn"
                title="About"
                onClick={() => {
                  dispatch(AboutTask(data));
                  navigate("/particularTask");
                }}
              ></i>
             ):''}
              
            </sub>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

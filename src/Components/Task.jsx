import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiuri } from "../constants";
import { Outlet, Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { GetMemberList, GetTaskList } from "../Redux/DataSlice";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";

const Task = () => {
  console.log("Task");

  const { LogInUser, IsLogIn, TaskList, Token } = useSelector(
    (state) => state.LoginDetails
  );
  // const IsLogIn = useSelector((state) => state.LoginDetails.IsLogIn);
  // const TaskLis = useSelector((state) => state.LoginDetails.TaskList);

  const [searchWords, setSearchWords] = useState();
  const [selectMembers, setSelectMembers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AllMembers, setAllMembers] = useState([]);
  const [AllTasks, setAllTasks] = useState(TaskList);
  let [filterOptions, setFilterOptions] = useState("All");
  const [reminderTask, setReminderTask] = useState([]);
  const [status, setStatus] = useState();


  useEffect(() => {
    if (LogInUser.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`, {
          headers: {
            auth: Token,
          },
        })
        .then(({ data }) => {
          dispatch(GetMemberList({ data: data }));
          setAllMembers(data);
        })
        .catch((err) => {
          if (err.toJSON().message === "Network Error") {
            console.log("Backend Connection is poor!!!");
          }
        });

      axios
        .get(`${apiuri}/getTaskList`, {
          headers: {
            auth: Token,
          },
        })
        .then(({ data }) => {
          dispatch(GetTaskList({ data: data }));
          setAllTasks(data);
        })
        .catch((err) => {
          console.log("Backend connection Poor!!!");
        });
    }
    if (LogInUser.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${LogInUser.username}`, {
          headers: {
            auth: Token,
          },
        })
        .then(({ data }) => {
          setAllTasks(data);
          dispatch(GetTaskList({ data: data }));
          setReminderTask(data.filter((item) => item.reminder == true));
        });
    }
  }, []);

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
          auth: Token,
        },
      }
    );

    if (apiRes.data !== "Update Failed") {
      console.log("Successfully Update");
    } else {
      console.log("Update Failed");
    }
  };

  let TaskListData = AllTasks;

  if (searchWords?.length) {
    TaskListData = AllTasks.filter((eachTask) => {
      if (
        eachTask.Task_Name.toLowerCase().includes(searchWords.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }

  if (filterOptions == "All") {
    TaskListData = TaskListData;
  } else {
    TaskListData = TaskListData.filter(
      (task) => task.Priority == filterOptions
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col ms-4">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search Task Name"
              aria-label="Search"
              onChange={(e) => {
                setSearchWords(e.target.value);
              }}
              style={{ width: "200px" }}
            />
          </form>
        </div>

        {/* Reminder Task Button */}

        {LogInUser.role == "Member" ? (
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-primary position-relative"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop1"
            >
              <i
                className="bi bi-bell"
                data-bs-toggle="popover"
                title="Reminder"
              ></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {reminderTask?.length}
              </span>
            </button>

            <div
              className="modal fade"
              id="staticBackdrop1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel1"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel1">
                      Notifications
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {reminderTask?.map((item, index) => {
                      return (
                        <div className="border p-3" key={index}>
                          {item?.Priority == "Priority" ? (
                            <span>
                              <i className="text-danger fw-bold bi bi-circle-fill mx-2"></i>
                              "
                              <strong className="text-danger">
                                {item?.Task_Name}
                              </strong>
                              " is {item?.Priority},Let's Do it now
                            </span>
                          ) : item?.taskStatus == "Pending" ? (
                            <span>
                              <i
                                className={
                                  item.Priority == "Priority"
                                    ? "text-danger fw-bold bi bi-circle-fill mx-2"
                                    : item.Priority == "Important"
                                    ? "text-success fw-bold bi bi-circle-fill mx-2"
                                    : "text-primary fw-bold bi bi-circle-fill mx-2"
                                }
                              ></i>
                              "<strong>{item?.Task_Name}</strong>" Task is Newly
                              assigned from{" "}
                              <strong>{item?.Assigner_Name}</strong>
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="row my-5 d-flex justify-content-end ">
        {LogInUser.role == "Admin" ? (
          <div className="col-sm-7 col-6">
            <button
              type="button"
              className="btn btn-outline-dark "
              onClick={() => {
                navigate("/addTask");
              }}
            >
              <i className="fa-solid fa-plus"></i>Add Task
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="col-sm-4 col-6">
          <select
            className="btn border dropdown-toggle"
            as="select"
            onChange={(e) => {
              setFilterOptions(e.target.value);
            }}
          >
            <option className="dropdown-item" value="All">
              All
            </option>
            <option
              className="dropdown-item text-success bi bi-circle-fill"
              value="Normal"
            >
              Normal
            </option>
            <option
              className="dropdown-item text-primary bi bi-circle-fill"
              value="Important"
            >
              Important
            </option>
            <option
              className="dropdown-item text-danger bi bi-circle-fill"
              value="Priority"
            >
              Priority
            </option>
          </select>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        {TaskListData.map((task, index) => {
          return (
            <Cart
              key={index}
              index={index}
              data={task}
              TaskList={TaskListData}
              setAllMembers={setAllMembers}
              setAllTasks={setAllTasks}
            />
              
          );
        })}
        {/* <div className="table-responsive">
          <table className="table table-hover ">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task Name</th>
                <th scope="col">Assigned to</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TaskListData.map((task, index) => {
                
                return (
                  
                  <tr key={index}>
                    
                    <th scope="row">{index + 1}</th>
                    <td>{task.Task_Name}</td>
                    <td>{task.Assigner_Name}</td>
                    <td>{task.TaskDueDate.slice(0, 10)}</td>
                    <td>
                      <select
                        value={task.taskStatus}
                        className="dropdown-toggle bg-outline-warning w-50 ms-2"
                        onChange={async (e) => {
                          console.log(e.target.value);
                          // setStatus(e.target.value);
                          handleChangeStatus(e.target.value, task._id);
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
                    </td>
                    <td>

                      <sub className="d-flex gap-2">
              <i
                className="bi bi-pencil-square btn"
                onClick={() => {
                  if (LogInUser.role == "Admin") {
                    dispatch(EditTask(data));
                    navigate(`/EditTask`);
                  } else {
                    alert("Admin only Edit this task");
                  }
                }}
              ></i>

              <i
                className="bi bi-trash btn"
                onClick={async (e) => {
                  if (LogInUser.role === "Admin") {
                    const apiRes = await axios.delete(
                      `${apiuri}/deleteParticularTask/${data._id}`,
                      {
                        headers: {
                          auth: Token,
                        },
                      }
                    );
                    if (apiRes != "Deleted Failed") {
                      alert("Deleted Success");
                      window.location.reload();
                    } else {
                      alert("Delete Failed");
                    }
                  } else {
                    alert("Admin only delete this task");
                  }
                }}
              ></i>

              <i
                className="bi bi-info-circle btn"
                onClick={() => {
                  dispatch(AboutTask(data));
                  navigate("/particularTask");
                }}
              ></i>
            </sub>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default Task;

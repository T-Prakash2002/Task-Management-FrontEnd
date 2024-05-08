import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiuri } from "../constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { GetMemberList, GetTaskList, EditTask } from "../Redux/DataSlice";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";
import { encryptStorage1 } from "../Encrypt/Encrpt";

const Task = () => {
  const user = useSelector((state) => state.LoginDetails.LogInUser);
  const IsLogIn = useSelector((state) => state.LoginDetails.IsLogIn);
  const TaskLis = useSelector((state) => state.LoginDetails.TaskList);
  const [searchWords, setSearchWords] = useState();
  const [selectMembers, setSelectMembers] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AllMembers, setAllMembers] = useState([]);
  const [AllTasks, setAllTasks] = useState(TaskLis);
  let [filterOptions, setFilterOptions] = useState("All");
  const [reminderTask, setReminderTask] = useState([]);
  // console.log(AllTasks);
  useEffect(() => {
    if (user.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`)
        .then(({ data }) => {
          dispatch(GetMemberList({ data: data }));
          setAllMembers(data);
        })
        .catch((err) => {
          if (err.toJSON().message === "Network Error") {
            alert("Connection is Poor!!,Check your Connection");
          }
        });

      axios.get(`${apiuri}/getTaskList`).then(({ data }) => {
        dispatch(GetTaskList({ data: data }));
        setAllTasks(data);
      });
    }
    if (user.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${user.username}`)
        .then(({ data }) => {
          setAllTasks(data);
          dispatch(GetTaskList({ data: data }));
          console.log("taskmember");
          setReminderTask(data.filter((item) => item.reminder == true));
        });
    }
  }, []);

  // setReminderTask(AllTasks.filter(item=>item.reminder==true))

  console.log(reminderTask);
  let TaskList = AllTasks;

  if (searchWords?.length) {
    TaskList = AllTasks.filter((eachTask) => {
      if (
        eachTask.Task_Name.toLowerCase().includes(searchWords.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }

  if (filterOptions == "All") {
    TaskList = TaskList;
  } else {
    TaskList = TaskList.filter((task) => task.Priority == filterOptions);
  }

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col">
          <form className="d-flex" role="search">
            <input
              className="form-control-sm me-2 border"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearchWords(e.target.value);
              }}
            />
          </form>
        </div>

        {/* Reminder Task Button */}

        {user.role == "Member" ? (
          <div className="col">
            <button
              type="button"
              className="btn btn-outline-primary position-relative"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i
                className="bi bi-bell"
                data-bs-toggle="popover"
                title="Reminder"
              ></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {reminderTask.length}
              </span>
            </button>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog  modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
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
                   <ul type="circle">
                    {
                      reminderTask.map((item,index)=>{
                        return <li className="border my-4" key={index}>{item.Task_Name} is {item.taskStatus}!! Hurry Up!!</li>
                      })
                    }
                    </ul> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* ----------------  style={{z-index:11}}*/}
      </div>

      <div className="row my-3 d-flex">
        {user.role == "Admin" ? (
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-dark "
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="bi bi-patch-plus-fill">Add Task</i>
            </button>
          </div>
        ) : (
          ""
        )}

        <div className="col-6">
          <select
            className="btn btn-outline-secondary dropdown-toggle"
            as="select"
            onChange={(e) => {
              setFilterOptions(e.target.value);
            }}
          >
            <option className="dropdown-item" value="All">
              All
            </option>
            <option className="dropdown-item" value="Normal">
              Normal
            </option>
            <option className="dropdown-item" value="Important">
              Important
            </option>
            <option className="dropdown-item" value="Priority">
              Priority
            </option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="collapse" id="collapseExample">
            <div className="Task p-sm-5">
              <Formik
                initialValues={{
                  Task_Name: "",
                  description: "",
                  TaskDeadLineDate: "",
                  priority: "",
                  assigned_member: selectMembers,
                }}
                validationSchema={CreateTaskValidation}
                onSubmit={async (values, { resetForm }) => {
                  console.log("register");

                  const TaskDetails = {
                    assigner: user.username,
                    Task_Name: values.Task_Name,
                    description: values.description,
                    CreatedAt: new Date(),
                    TaskDeadLineDate: values.TaskDeadLineDate,
                    priority: values.priority,
                    assigned_member: selectMembers,
                  };

                  //   console.log(`${apiuri}/Registration`);
                  if (IsLogIn) {
                    await axios.post(`${apiuri}/createTask`, {
                      ...TaskDetails,
                    });

                    window.location.reload();
                  } else {
                    alert("LogIn Is Must");
                  }

                  resetForm();
                }}
              >
                <Form className="row">
                  <div className="mb-3 col-12">
                    <label htmlFor="Task_Name">Task Name</label>
                    <Field
                      type="text"
                      name="Task_Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      className="err small"
                      name="Task_Name"
                      component="div"
                    />
                  </div>

                  <div className="mb-3 co-12">
                    <label htmlFor="description">Task Description</label>
                    <Field
                      as="textarea"
                      name="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      className="err small"
                      name="description"
                      component="div"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="TaskDeadLineDate">DeadLine Date</label>
                    <Field
                      type="date"
                      name="TaskDeadLineDate"
                      className="form-control"
                    />
                    <ErrorMessage
                      className="err small"
                      name="TaskDeadLineDate"
                      component="div"
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3 ">
                    <label htmlFor="status" className="">
                      Priority
                    </label>
                    <br />

                    <Field
                      name="priority"
                      className="btn btn-secondary dropdown-toggle"
                      as="select"
                    >
                      <option value="Select_Priority">Select an option</option>
                      <option value="Normal">Normal</option>
                      <option value="Important">Important</option>
                      <option value="Priority">Priority</option>
                    </Field>

                    <ErrorMessage
                      className="err small"
                      name="priority"
                      component="div"
                    />
                  </div>

                  {/* Assigned members */}

                  <div className="col mb-3">
                    {/* ................................................................................................................. */}

                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Assign Member
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalToggleLabel"
                            >
                              Assign Members
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <ul typeof="none">
                              {AllMembers.map((member, index) => {
                                return (
                                  <div className="form-check" key={index}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="checkMember"
                                      value={member.username}
                                      id={member.username}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectMembers([
                                            ...selectMembers,
                                            e.target.value,
                                          ]);
                                        } else {
                                          setSelectMembers(
                                            selectMembers.filter(
                                              (item) => item != e.target.value
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={member.username}
                                    >
                                      {member.username}
                                    </label>
                                    <hr />
                                  </div>
                                );
                              })}
                            </ul>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              data-bs-dismiss="modal"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ................................................................................................................... */}
                    <ErrorMessage
                      className="err small"
                      name="assigned_member"
                      component="div"
                    />
                  </div>

                  <div className="my-3">
                    <button type="submit" className="btn btn-dark form-control">
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {TaskList.map((task, index) => {
          return (
            <Cart
              key={index}
              index={index}
              data={task}
              TaskList={TaskList}
              setAllMembers={setAllMembers}
              setAllTasks={setAllTasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Task;

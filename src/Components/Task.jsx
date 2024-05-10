import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiuri } from "../constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { GetMemberList, GetTaskList } from "../Redux/DataSlice";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";



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

  useEffect(() => {
    if (user.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`,
                  {
                    headers: {
                      auth: localStorage.getItem("userToken"),
                    }})
        .then(({ data }) => {
          dispatch(GetMemberList({ data: data }));
          setAllMembers(data);
        })
        .catch((err) => {
          if (err.toJSON().message === "Network Error") {
            console.log("Backend Connection is poor!!!");
          }
        });

      axios.get(`${apiuri}/getTaskList`,
                  {
                    headers: {
                      auth: localStorage.getItem("userToken"),
                    }}).then(({ data }) => {
        dispatch(GetTaskList({ data: data }));
        setAllTasks(data);
      });
    }
    if (user.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${user.username}`,
                  {
                    headers: {
                      auth: localStorage.getItem("userToken"),
                    }})
        .then(({ data }) => {
          setAllTasks(data);
          dispatch(GetTaskList({ data: data }));
          setReminderTask(data.filter((item) => item.reminder == true));
        });
    }
  }, []);

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

  function differenceInDay(data) {
    const endDate = new Date(data.TaskDueDate);
    const startDate = Date.now();
    const timeDifferenceMS = endDate - startDate;

    const timeDifferenceSecs = Math.floor(timeDifferenceMS / 1000);
    const timeDifferenceMins = Math.floor(timeDifferenceMS / 60000);
    const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
    const differenceInDays = Math.floor(timeDifferenceMS / 86400000);

    if (differenceInDays == 1 || differenceInDays == 0) {
      if (data?.Priority != "Priority") {
        let r = true;
        handleupdatePriority(data._id, r);
      }
    }
    return differenceInDays;
  }

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 border"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setSearchWords(e.target.value);
              }}
              style={{width:"200px"}}
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
                  TaskDeadLineTime: "",
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
                    TaskDeadLineTime: values.TaskDeadLineTime,
                    priority: values.priority,
                    assigned_member: selectMembers,
                  };

                  console.log(TaskDetails);
                  if (IsLogIn) {
                    await axios.post(`${apiuri}/createTask`, {
                      ...TaskDetails,
                    },
                  {
                    headers: {
                      auth: localStorage.getItem("userToken"),
                    }});

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
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="TaskDeadLineTime">DeadLine Date</label>
                    <Field
                      type="time"
                      name="TaskDeadLineTime"
                      className="form-control"
                    />
                    <ErrorMessage
                      className="err small"
                      name="TaskDeadLineTime"
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

      <div className="row d-flex">
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

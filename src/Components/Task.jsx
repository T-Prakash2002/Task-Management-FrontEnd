import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";
import { apiuri } from "../constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { GetMemberList } from "../Redux/DataSlice";

const Task = () => {
  const MemberList = useSelector((state) => state.LoginDetails.MemberList);
  const user=useSelector(state=>state.LoginDetails.LogInUser);

  const [selectMembers, setSelectMembers] = useState([]);

  console.log(selectMembers);
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col">
          <h6>Task Management</h6>
        </div>
        <div className="col">
          <form className="d-flex" role="search">
            <input
              className="form-control-sm me-2 border"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {}}
            />
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="btn btn-outline-dark"
          >
            <i className="bi bi-patch-plus-fill">Add Task</i>
          </button>

          {/*      Create Task Model     */}

          <div className="collapse" id="collapseExample">
            <div className="card card-body">
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
                    assigner:user.username,
                    Task_Name: values.Task_Name,
                    description: values.description,
                    TaskDeadLineDate: values.TaskDeadLineDate,
                    priority: values.priority,
                    assigned_member: selectMembers,
                  };

                    console.log(TaskDetails);
                //   console.log(`${apiuri}/Registration`);

                    const apiRes = await axios.post(
                      `${apiuri}/createTask`,
                      {
                        ...TaskDetails,
                      }
                    );
                    console.log(apiRes.data);
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

                  <div className="col-6 mb-3">
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

                  <div className="col-6 mb-3 ">
                    <label htmlFor="status" className="">
                      Priority
                    </label>
                    <br />

                    <Field name="priority" className="btn btn-secondary dropdown-toggle" as="select">
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
                                {MemberList.map((member, index) => {
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
        
        

      </div>
    </div>
  );
};

export default Task;

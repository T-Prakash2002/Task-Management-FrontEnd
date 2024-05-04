import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";
import { apiuri } from "../constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { GetMemberList } from "../Redux/DataSlice";

const Task = () => {
  const user = useSelector((state) => state.LoginDetails.LogInUser);

  const MemberLi = useSelector((state) => state.LoginDetails.MemberList);

  const MemberList = MemberLi ? MemberLi : localStorage.getItem("MemberList");

  const dispatch = useDispatch();

  console.log(localStorage.getItem("MemberList"));
  
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
                  assigned_member: "",
                }}
                validationSchema={CreateTaskValidation}
                onSubmit={async (values, { resetForm }) => {
                  console.log("register");

                  const TaskDetails = {
                    Task_Name: values.Task_Name,
                    description: values.description,
                    TaskDeadLineDate: values.TaskDeadLineDate,
                    assigned_member: values.assigned_member,
                    dataofjoin: values.dataofjoin,
                    address: values.address,
                    city: values.city,
                    zipCode: values.zipCode,
                  };

                  //console.log(`${apiuri}/${values.role}Registration`);

                  //   const apiRes = await axios.post(
                  //     `${apiuri}/${values.role}Registration`,
                  //     {
                  //       ...userDetails,
                  //     }
                  //   );
                  //   console.log(apiRes.data);
                  //   resetForm();
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
                      Status
                    </label>
                    <br />

                    <Field
                      as="select"
                      name="status"
                      className="btn btn-secondary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <option value="new">New</option>
                      <option value="Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                    </Field>

                    <ErrorMessage
                      className="err small"
                      name="assigned_member"
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
                      <div className="modal-dialog modal-dialog-scrollable modal-sm">
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
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                console.log(e.target.value);
                              }}
                            >
                              {MemberList.map((member, index) => {
                                return (
                                  <>
                                    <div className="form-check" key={index}>
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={member.username}
                                      />
                                      <label
                                        className="form-check-label"
                                        for={member.username}
                                      >
                                        {member.username}
                                      </label>
                                    </div>
                                    <hr />
                                  </>
                                );
                              })}
                              
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm"
                                  data-bs-dismiss="modal"
                                >
                                  Submit
                                </button>
                              
                            </form>
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
    </div>
  );
};

export default Task;

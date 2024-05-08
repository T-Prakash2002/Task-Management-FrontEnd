import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { CreateTaskValidation } from "../Validatation/validateform";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CreateTask } from "../Redux/DataSlice";
import "../Style/Task.css";
import { DatePicker, TodoPicker, RangePicker } from "datepicker-xyermik"

import { apiuri } from "../constants";

const EditTask = () => {

  const [AllMembers, setAllMembers] = useState([]);
  const user = useSelector((state) => state.LoginDetails.LogInUser.username);
  const IsLogIn = useSelector((state) => state.LoginDetails.IsLogIn);
  const EditData = useSelector((state) => state.LoginDetails.Edit);
  const [selectMembers, setSelectMembers] = useState([]);

  const navigate = useNavigate();

  const handleGetMemberList = async () => {
    console.log("getmember");
    await axios
      .get(`${apiuri}/getMemberList`)
      .then(({ data }) => {
        setAllMembers(data);
      })
      .catch((err) => {
        if (err.toJSON().message === "Network Error") {
          alert("Connection is Poor!!,Chek your Connection");
        }
      });
  };

  const date = new Date(EditData.TaskDueDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

    // console.log(EditData.Assigned_members,"   assign member");
  return (
    <div className="Task p-3 p-lg-5 w-75">
      <Formik
        initialValues={{
          Task_Name: EditData.Task_Name,
          description: EditData.Description,
          TaskDeadLineDate: formattedDate,
          priority: EditData.Priority,
        }}
        validationSchema={CreateTaskValidation}
        onSubmit={async (values, { resetForm }) => {
          console.log("create task");

          let tempAssignMember=[];

          console.log(selectMembers.length);
          console.log(EditData.Assigned_members);

            if(selectMembers.length<1){
                tempAssignMember=EditData.Assigned_members;
            }else{
                tempAssignMember=selectMembers;
            }

            console.log(tempAssignMember);

          const TaskDetails = {
            assigner: user,
            Task_Name: values.Task_Name,
            description: values.description,
            TaskDeadLineDate: values.TaskDeadLineDate,
            priority: values.priority,
            assigned_member: tempAssignMember,
          };

          if (IsLogIn) {
            const apiRes = await axios.put(
              `${apiuri}/EditTask/${EditData._id}`,
              {
                ...TaskDetails,
              }
            );

            if (apiRes.data !=="Update Failed") {
              navigate("/task");
              resetForm();
            }else{
                console.log("Update Failed");
            }
          }
        }}
      >
        <Form className="row ">
          <h3 className="text-center">Edit Task</h3>
          <div className="mb-3 col-12">
            <label htmlFor="Task_Name">Task Name</label>
            <Field type="text" name="Task_Name" className="form-control" />
            <ErrorMessage
              className="err small"
              name="Task_Name"
              component="div"
            />
          </div>

          <div className="mb-3 co-12">
            <label htmlFor="description">Task Description</label>
            <Field as="textarea" name="description" className="form-control" />
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
          </div>
          

          <div className="col-12 col-sm-6 mb-3 ">
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

          <div className="col-12 col-sm-6 mb-3">
            {/* .............................................................................................................. */}

            <br />
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => handleGetMemberList()}
              
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
                    <h5 className="modal-title" id="exampleModalToggleLabel">
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

          <div className="my-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-dark form-control w-50">
              Edit Task
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditTask;

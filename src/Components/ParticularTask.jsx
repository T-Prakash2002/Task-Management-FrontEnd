import React from "react";
import { useSelector } from "react-redux";
import { encryptStorage1, encryptStorage2 } from "../Encrypt/Encrpt";
import { useNavigate } from "react-router-dom";

const ParticularTask = () => {

  const taskInfo = encryptStorage2.getItem("InfoTask");
  const navigate=useNavigate()

  return (
    <div>
      <dl className="row ms-4">
        <h2 className="text-center mb-5">{taskInfo?.Task_Name}</h2>
        <dt className="col-sm-3">Task Description:</dt>
        <dd className="col-sm-9">{taskInfo?.Description}</dd>
        <dt className="col-sm-3">Priority Status:</dt>
        <dd className="col-sm-9">
          <p>
            <i
              className={
                taskInfo?.Priority == "Priority"
                  ? "text-danger fw-bold bi bi-circle-fill mx-2"
                  : taskInfo?.Priority == "Important"
                  ? "text-success fw-bold bi bi-circle-fill mx-2"
                  : "text-primary fw-bold bi bi-circle-fill mx-2"
              }
            ></i>
            {taskInfo?.Priority}
          </p>
        </dd>
        <dt className="col-sm-3">Assigner_Name:</dt>
        <dd className="col-sm-9">{taskInfo?.Assigner_Name}</dd>
        <dt className="col-sm-3">Allocated_Member:</dt>
        <dd className="col-sm-9">
          <span className="items">
            {taskInfo?.Assigned_members?.map((list, index) => {
              return (
                <span className="item" key={index}>
                  {list}
                </span>
              );
            })}
          </span>
        </dd>
        <dt className="col-sm-3">Created At:</dt>
        <dd className="col-sm-9">{taskInfo?.CreatedAt.slice(0, 10)}</dd>
        <dt className="col-sm-3">Deadline Date:</dt>
        <dd className="col-sm-9">{taskInfo?.TaskDueDate.slice(0, 10)}</dd>
        <dt className="col-sm-3">Task Deadline Time:</dt>
        <dd className="col-sm-9">{taskInfo?.TaskDueTime}</dd>
        <dt className="col-sm-3">Task Status:</dt>
        <dd className="col-sm-9">{taskInfo?.taskStatus}</dd>
        
      </dl>
      <div className="btn btn-outline-dark ms-5" onClick={()=>{
        navigate('/task')
      }}>Back</div>
    </div>
  );
};

export default ParticularTask;

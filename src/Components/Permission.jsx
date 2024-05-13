import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiuri } from "../constants";
import { useSelector } from "react-redux";

const Permission = ({ member }) => {
  const Token = useSelector((state) => state.LoginDetails.Token);

  const [permission, setPermission] = useState({
    viewTask: member?.viewTask,
    createTask: member?.createTask,
    editTask: member?.editTask,
    deleteTask: member?.deleteTask,
  });

  const handlePermission = async (name, checked) => {
    setPermission({
      ...permission,
      [name]: checked,
    });
  };

  return (
    <div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          name="viewTask"
          id={member?.email + "view"}
          checked={permission?.viewTask}
          onChange={async (e) => {
            setPermission({
              ...permission,
              [e.target.name]: e.target.checked,
            });
            const apiRes=await axios.put(
              `${apiuri}/updatePermission/${member?.email}`,
              {
                [e.target.name]: e.target.checked,
              },
              {
                headers: {
                  auth: Token,
                },
              }
            );
            // if(apiRes.data !=="Failed to Update!"){
            //   console.log("Successfully Update")
            // }else{
            //   console.log("Failed to Update")
            // }
          }}
        />
        <label className="form-check-label" htmlFor={member?.email + "view"}>
          ViewTask
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id={member?.email + "create"}
          name="createTask"
          checked={permission?.createTask}
          onChange={async (e) => {
            setPermission({
              ...permission,
              [e.target.name]: e.target.checked,
            });
            const apiRes=await axios.put(
              `${apiuri}/updatePermission/${member?.email}`,
              {
                [e.target.name]: e.target.checked,
              },
              {
                headers: {
                  auth: Token,
                },
              }
            );
            
          }}
        />
        <label className="form-check-label" htmlFor={member?.email + "create"}>
          Create Task
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id={member?.email + "edit"}
          name="editTask"
          checked={permission?.editTask}
          onChange={async (e) => {
            setPermission({
              ...permission,
              [e.target.name]: e.target.checked,
            });
            const apiRes=await axios.put(
              `${apiuri}/updatePermission/${member?.email}`,
              {
                [e.target.name]: e.target.checked,
              },
              {
                headers: {
                  auth: Token,
                },
              }
            );
            
          }}
        />
        <label className="form-check-label" htmlFor={member?.email + "edit"}>
          EditTask
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id={member?.email + "delete"}
          name="deleteTask"
          checked={permission?.deleteTask}
          onChange={async (e) => {
            setPermission({
              ...permission,
              [e.target.name]: e.target.checked,
            });
            const apiRes=await axios.put(
              `${apiuri}/updatePermission/${member?.email}`,
              {
                [e.target.name]: e.target.checked,
              },
              {
                headers: {
                  auth: Token,
                },
              }
            );
            
          }}
        />
        <label className="form-check-label" htmlFor={member?.email + "delete"}>
          DeleteTask
        </label>
      </div>
    </div>
  );
};

export default Permission;

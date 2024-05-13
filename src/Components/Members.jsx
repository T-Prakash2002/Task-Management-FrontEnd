import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link, NavLink } from "react-router-dom";

const Members = () => {
  const { MemberList } = useSelector((state) => state.LoginDetails);

  const [permission,setPermission]=useState({

  })

  console.log(MemberList);
  return (
    <div className="d-flex justify-content-center">
      {MemberList?.map((member, index) => {
        return (
          <div class="card" style={{ width: "18rem" }} key={index}>
            <div class="card-body">
              <h5 class="card-title">{member?.username}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{member?.email}</h6>
              <h6 className="card-text">{member?.Phonenumber}</h6>
              <h6 className="card-text">Role:{member?.role}</h6>
              <p class="card-text">{member.Address}</p>
              <p>
                <h6>Permission:</h6>
                <div>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault1"
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault1"
                    >
                      ViewTask
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault2"
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault2"
                    >
                      Create Task
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault3"
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault3"
                    >
                      EditTask
                    </label>
                  </div>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault4"
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault4"
                    >
                      DeleteTask
                    </label>
                  </div>
                </div>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Members;

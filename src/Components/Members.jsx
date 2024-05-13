import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiuri } from "../constants";
import { GetMemberList } from "../Redux/DataSlice";
import Permission from "./Permission";


const Members = () => {
  const { LogInUser,MemberList,Token } = useSelector((state) => state.LoginDetails);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(LogInUser.role=="Admin"){
      axios
        .get(`${apiuri}/getMemberList`, {
          headers: {
            auth: Token,
          },
        })
        .then(({ data }) => {
          dispatch(GetMemberList({ data: data }));
        })
        .catch((err) => {
          if (err.toJSON().message === "Network Error") {
            console.log("Backend Connection is poor!!!");
          }
        });
    }
  },[])
 
  return (
    <div className="row d-flex justify-content-center">
      {MemberList?.map((member, index) => {
        return (
          <div className="card col-6 col-md-4 col-lg-3" style={{ width: "18rem" }} key={index}>
            <div className="card-body">
              <h5 className="card-title">{member?.username}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{member?.email}</h6>
              <h6 className="card-text">{member?.Phonenumber}</h6>
              <h6 className="card-text">Role:{member?.role}</h6>
              <p className="card-text">{member.Address}</p>
              <div>
                <h6>Permission:</h6>
                <Permission member={member}/>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Members;

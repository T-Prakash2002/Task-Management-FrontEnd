import React, { useEffect, useState } from "react";
import { apiuri } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { GetMemberList } from "../Redux/DataSlice";
import axios from "axios";


const DashBoard = () => {
  const user = useSelector((state) => state.LoginDetails.LogInUser);

  const MemberList = useSelector((state) => state.LoginDetails.MemberList);

  const dispatch = useDispatch();


  useEffect(() => {
    if (user.role === "Admin") {

      axios.get(`${apiuri}/getMemberList`)
      .then(({data})=>{
        
        dispatch(GetMemberList({ data: data }));

      })
    }  
  },[]);

  console.log(MemberList);

  return (
    <>
      {
        
      }
    </>
  );
};

export default DashBoard;

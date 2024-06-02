import React, { useEffect, useState } from "react";
import { apiuri } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { GetMemberList, GetTaskList  } from "../Redux/DataSlice";
import Slider from "react-slick";



const DashBoard = () => {
  const {LogInUser,MemberList,TaskList,Token} = useSelector((state) => state.LoginDetails);

  const [AllMembers, setAllMembers] = useState(MemberList);
  const [AllTasks, setAllTasks] = useState(TaskList);
  const dispatch = useDispatch();


useEffect(() => {
    if (LogInUser?.role === "Admin") {
      axios
        .get(`${apiuri}/getMemberList`,
                  {
                    headers: {
                      auth: Token,
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
                      auth: Token,
                    }}).then(({ data }) => {
        dispatch(GetTaskList({ data: data }));
        setAllTasks(data);
        
      });
    }
    if (LogInUser?.role == "Member") {
      axios
        .get(`${apiuri}/getTaskParticularMember/${LogInUser.username}`,
                  {
                    headers: {
                      auth: Token,
                    }})
        .then(({ data }) => {
          setAllTasks(data);
          dispatch(GetTaskList({ data: data }));
        });
    }
  }, []);


  const settings = {
    className: "",
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    focusOnSelect: true,
    waitForAnimate: false,
  };

  const handlegetCount=(str)=>{

    const count=AllTasks.filter(list=>list.taskStatus === str)

    return count.length;
  }

  
  return (
    <>
      <div className="slider-container bg-success-subtle mt-4">
        <Slider {...settings}>
          {AllTasks.map((task, index) => {
            return (
              <div className="mt-3" key={index}>
                <h1 className="text-center">{task.Task_Name}</h1>
                <h6 className="text-end me-4 text-muted">
                  Assigner-{task.Assigner_Name}
                </h6>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="row">
        <div className="col">
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Total Assigned Task</h5>
              <h1 className="text-center mt-3 count text-body-secondary">
                {AllTasks.length}
              </h1>
            </div>
          </div>
        </div>
                <div className="col">
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Total Pending Task</h5>
              <h1 className="text-center mt-3 count text-body-secondary">
                {handlegetCount('Pending')}
              </h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Total Completed Task</h5>
              <h1 className="text-center mt-3 count text-body-secondary">
                {handlegetCount('Completed')}
              </h1>
              
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Total Progress Task</h5>
              <h1 className="text-center mt-3 count text-body-secondary">
                {handlegetCount('Progress')}
              </h1>
              
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default DashBoard;

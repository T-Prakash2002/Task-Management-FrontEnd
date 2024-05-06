import React,{useState} from "react";
import "../Style/Cart.css";

const Cart = ({ data }) => {
  
 const selectedDate = new Date(data.TaskDueDate); 
  const currentDate = new Date(); 

  const differenceInMilliseconds = Math.abs(selectedDate - currentDate);
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
  return (
    <>
      <div className="card">
        <sup>
        {differenceInDays} days pending
        </sup>
        <h3 className="text-center">{data.Task_Name}</h3>
        <div className="card-body">
            <div className="card-text small">
                <strong>Assigner_Name:</strong>
                <span>{data.Assigner_Name}</span>
            </div>

          <div className="fw-bolder fs-5">
            <sub className="d-flex gap-2">

            <i className="bi bi-pencil-square"></i>
            
            <i className="bi bi-trash"></i>

            <i className="bi bi-info-circle"></i>

            </sub>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

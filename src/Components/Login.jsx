import { Loginvalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { SignIn } from "../Redux/DataSlice";



export default function Login() {

    const navigate = useNavigate();
    const dispatch=useDispatch();

  return (
    <div className="loginpage">
      <div className="card w-50">
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "", role: "" }}
            validationSchema={Loginvalidateform}
            onSubmit={async (values, { resetForm }) => {
              //                 const role=(values.role=="mentor")?mentors:students;
              //
              //                 const auth=role.some(user=>user.username===values.username && user.password===values.password);
              //
              //                 if(auth){
              //                     localStorage.setItem("login",JSON.stringify(values))
              //                 }else{
              //                     alert(`${values.username} is not a ${values.role} list`)
              //                 }

              console.log("login");
              const apiResponse = await axios.get(
                `${apiuri}/login/${values.username}/${values.password}/${values.role}`
              )

              if (apiResponse.data && apiResponse.data != "Login Failed") {
                localStorage.setItem("login", apiResponse.data);
                console.log("Login Successfully!!!");
                dispatch(SignIn());
                //navigate("/register")
              } else {
                
                alert("User Not Found! Try Again");
              }
              resetForm()
            }}
          >
            <Form>
              <h3 className="text-center">Login</h3>
              <div className="mb-3">
                <label htmlFor="username">User Name</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="username"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  className="err small"
                  name="password"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label className="col-12 col-sm-6">
                  <Field type="radio" name="role" value="mentor" />
                  Mentor
                </label>
                <label className="col-12 col-sm-6">
                  <Field type="radio" name="role" value="student" />
                  Student
                </label>

                <ErrorMessage
                  className="err small"
                  name="role"
                  component="div"
                />
              </div>

              <div className="mb-3">
                {/* <button type="submit" className="btn btn-dark form-control">
                  Submit
                </button> */}
                <button type="submit" className="btn btn-dark form-control">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

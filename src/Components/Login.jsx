import { Loginvalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignIn, GetMemberList } from "../Redux/DataSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              const apiResponse = await axios
                .get(
                  `${apiuri}/login/${values.username}/${values.password}/${values.role}`
                )
                .catch((err) => {
                  if (err.toJSON().message === "Network Error") {
                    alert("Connection is Poor!!,Chek your Connection");
                  }
                });

              if (apiResponse.data && apiResponse.data != "Login Failed") {
                console.log("Login Successfully!!!");
                dispatch(SignIn(apiResponse.data));

                navigate("/dashboard");
              } else {
                alert("User Not Found! Try Again");
              }
              resetForm();
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
                <label>Role:</label>
                <br />
                <Field as="select" name="role" className="form-control-sm">
                  <option value="Select_user">Select User</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </Field>

                <ErrorMessage
                  className="err small"
                  name="role"
                  component="div"
                />
              </div>

              <div className="mb-3">
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

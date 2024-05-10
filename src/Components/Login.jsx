import { Loginvalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignIn, GetMemberList } from "../Redux/DataSlice";
import bcryptjs from "bcryptjs";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="p-4 p-md-5">
      <div className="row">
        <div className="col">
          <Formik
            initialValues={{ username: "", password: "", role: "" }}
            validationSchema={Loginvalidateform}
            onSubmit={async (values, { resetForm }) => {
              console.log("login");

              const apiResponse = await axios.get(
                `${apiuri}/login?username=${values.username}&role=${values.role}`,
                
              );

              const isValid = await bcryptjs.compare(
                values.password,
                apiResponse.data.password
              );
              console.log(apiResponse.data)

              if (isValid) {
                console.log("Login Successfully!!!");

                const apiResponse_User = await axios.get(
                `${apiuri}/loginUser?username=${values.username}&role=${values.role}`,
                
              );

              console.log(apiResponse_User.data._doc)

              localStorage.setItem("userToken",apiResponse_User.data.tokenValid)

                dispatch(SignIn({data:apiResponse_User.data._doc}));

                if(values.role=="Admin"){
                  await axios.get(`${apiuri}/getMemberList`,{
                    headers: {
                      auth: localStorage.getItem("userToken"),
                    },
                  }).then(
                  ({ data }) => {
                    dispatch(GetMemberList({ data: data }));
                  },
                  
                );
                }
                navigate("/dashboard");
              } else {
                alert("User Not Found! Try Again");
              }
              resetForm();
            }}
          >
            <Form>
              <h3 className="text-center">Login</h3>
              <hr className="border border-danger border-2 opacity-50" />
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
                 <Link className="text-decoration-none" to="/register">
                      New User<i className="bi bi-arrow-right-circle-fill ms-2 "></i>
                    </Link>
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

import { Loginvalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignIn, GetMemberList } from "../Redux/DataSlice";
import bcryptjs from "bcryptjs";
import { encryptStorage1 } from "../Encrypt/Encrpt";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("Login");
  return (
    <div className="p-4 p-md-5">
      <div className="row">
        <div className="col">
          <Formik
            initialValues={{ email: "", password: "", role: "" }}
            validationSchema={Loginvalidateform}
            onSubmit={async(values, { resetForm }) => {
              console.log("login");


              const apiResponse = await axios.get(
                `${apiuri}/login?email=${values.email}&password=${values.password}&role=${values.role}`,
              );

              if(apiResponse.data !=="Login Failed"){
                
                dispatch(SignIn({data:apiResponse.data._doc}));
                encryptStorage1.setItem("userToken",apiResponse.data.tokenValid)
                //  console.log(apiResponse.data._doc)
                alert("Success")
                navigate("/dashboard");
              }else{
                alert("User Not Found !")
              }

//               const isValid = await bcryptjs.compare(
//                 values.password,
//                 apiResponse.data.password
//               );
//               console.log(apiResponse.data)
// 
//               if (isValid) {
//                 
//                 const apiResponse_User = await axios.get(
//                 `${apiuri}/loginUser?username=${values.username}&role=${values.role}&id=${apiResponse.data._id}`,
//               );
// 
//               console.log(apiResponse_User.data._doc)
// 
//               localStorage.setItem("userToken",apiResponse_User.data.tokenValid)
// 
//                 dispatch(SignIn({data:apiResponse_User.data._doc}));
//                 console.log("Login Successfully!!!");
// 
//                 if(values.role=="Admin"){
// 
//                   await axios.get(`${apiuri}/getMemberList`,{
//                     headers: {
//                       auth: localStorage.getItem("userToken"),
//                     },
//                   }).then(  
//                   ({ data }) => {
//                     dispatch(GetMemberList({ data: data }));
//                   },
//                   
//                 );
//                 }
//                 navigate("/dashboard");
//               } else {
//                 alert("User Not Found! Try Again");
//               }
              resetForm();
            }}
          >
            <Form>
              
            <div className="container  d-flex flex-column">

              <h3 className="text-center">Login</h3>
              <hr className="border border-danger border-2 opacity-50" />

              <div className="col-sm-6">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="email"
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
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

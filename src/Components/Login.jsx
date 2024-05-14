import { Loginvalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignIn, GetMemberList,GetTaskList,LoadingTrue,LoadingFalse } from "../Redux/DataSlice";
import { encryptStorage1 } from "../Encrypt/Encrpt";
import Loading from '../Loading'


export default function Login() {
  const {IsLoading} =useSelector(state=>state.LoginDetails)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (

    <div className="loginForm">
      {
            IsLoading?<Loading />:""
      }
      <div className="row">
        <div className="col ">
          <Formik
            initialValues={{ email: "", password: "", role: "" }}
            validationSchema={Loginvalidateform}
            onSubmit={async (values, { resetForm }) => {

              dispatch(LoadingTrue())

              const apiResponse = await axios.get(
                `${apiuri}/login?email=${values.email}&password=${values.password}&role=${values.role}`
              );

              if (apiResponse.data !== "Login Failed") {
                dispatch(
                  SignIn({
                    data: apiResponse.data._doc,
                    token: apiResponse.data.tokenValid,
                  })
                );
                encryptStorage1.setItem(
                  "userToken",
                  apiResponse.data.tokenValid
                );

                dispatch(LoadingFalse())

                alert("Success");


                if (values?.role === "Admin") {
                  axios
                    .get(`${apiuri}/getMemberList`, {
                      headers: {
                        auth: apiResponse.data.tokenValid,
                      },
                    })
                    .then(({ data }) => {
                      dispatch(GetMemberList({ data: data }));
                    })
                    .catch((err) => {
                      if (err?.toJSON().message === "Network Error") {
                        console.log("Backend Connection is poor!!!");
                      }
                    });

                  axios
                    .get(`${apiuri}/getTaskList`, {
                      headers: {
                        auth: apiResponse.data.tokenValid,
                      },
                    })
                    .then(({ data }) => {
                      dispatch(GetTaskList({ data: data }));
                    });
                }
                if (values?.role == "Member") {
                  axios
                    .get(`${apiuri}/getTaskParticularMember/${values?.username}`, {
                      headers: {
                        auth: apiResponse.data.tokenValid,
                      },
                    })
                    .then(({ data }) => {
                      dispatch(GetTaskList({ data: data }));
                    });
                }
                navigate("/");

              } else {
                alert("User Not Found !");
              }
              resetForm();
            }}


          >
            
            <Form className="formLogin">
              <div className="d-flex flex-column">
                <h3 className="text-center">Login</h3>
                <hr className="border border-danger border-2 opacity-50" />

                <div className="mb-3">
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
                    New User
                    <i className="bi bi-arrow-right-circle-fill ms-2 "></i>
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

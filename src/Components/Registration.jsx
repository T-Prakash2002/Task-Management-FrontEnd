import { Registervalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function Registration() {
  const user = useSelector((state) => state.LoginDetails.LogInUser);

  console.log("Registration");
  return (
    <div className="p-4 p-md-5">
      <div className="row ">
        <div className="col">
          <Formik
            initialValues={{
              username: "",
              password: "",
              Cpassword: "",
              email: "",
              age: "",
              role: "",
              phonenumber: "",
              dataofjoin: "",
              address: "",
              city: "",
              zipCode: "",
            }}
            validationSchema={Registervalidateform}
            onSubmit={async (values, { resetForm }) => {
              console.log("register");


              const userDetails = {
                username: values.username,
                password: values.password,
                email: values.email,
                age: values.age,
                role: values.role,
                phonenumber: values.phonenumber,
                dataofjoin: values.dataofjoin,
                address: values.address,
              };

              console.log(userDetails)

              const dbRes = await axios.post(`${apiuri}/UserRegistration`, {
                ...userDetails,
              });

              
              if (dbRes.data == "email already registered") {
                alert("This email is Already Registered,Try another Email")
              }else{
                if (dbRes.data !== "Registration Failed") {
                  alert("Register Success!!");
                  resetForm();
                } else {
                  console.log("Registration Failed!!");
                }
              }

              
            }}
          >
            <Form className="row">
              <h2 className="text-center">Registration</h2>
              <hr className="border border-danger border-2 opacity-50" />
              <div className="mb-3 col-sm-6">
                <label htmlFor="username">User Name</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="username"
                  component="div"
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="email"
                  component="div"
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="age">Age</label>
                <Field
                  type="text"
                  name="age"
                  className="form-control form-control-sm"
                />
                <ErrorMessage
                  className="err small"
                  name="age"
                  component="div"
                />
              </div>

              <div className="mb-3 col-sm-6">
                <label htmlFor="phonenumber">Phone Number</label>
                <Field type="tel" name="phonenumber" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="phonenumber"
                  component="div"
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="dataofjoin">Date of Joining</label>
                <Field type="date" name="dataofjoin" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="dataofjoin"
                  component="div"
                />
              </div>

              <div className="col-sm-6 mb-3">
                <label>Role:</label>
                <br />
                <Field as="select" name="role" className="form-control-sm">
                  <option value="Select_user">Select an option</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </Field>

                <ErrorMessage
                  className="err small"
                  name="role"
                  component="div"
                />
              </div>

              <div className="mb-3 co-12">
                <label htmlFor="address">Address</label>
                <Field as="textarea" name="address" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="address"
                  component="div"
                />
              </div>

              <div className="mb-3 col-sm-6">
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

              <div className="mb-3 col-sm-6">
                <label htmlFor="Cpassword">Confirm Password</label>
                <br />
                <Field
                  type="password"
                  name="Cpassword"
                  className="form-control"
                />
                <ErrorMessage
                  className="err small"
                  name="Cpassword"
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

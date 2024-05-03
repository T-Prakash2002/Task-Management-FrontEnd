import { Registervalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";

export default function Registration() {
  return (
    <div className="registrationpage">
      <div className="card w-75 ">
        <div className="card-body">
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
              city:"",
              zipCode:"",
            }}
            validationSchema={Registervalidateform}
            onSubmit={async (values, { resetForm }) => {
              console.log("register");

              const userDetails = {
                username: values.username,
                password: values.password,
                email: values.email,
                age: values.age,
                phonenumber: values.phonenumber,
                dataofjoin: values.dataofjoin,
                address: values.address,
                city: values.city,
                zipCode: values.zipCode,
              };

              //console.log(`${apiuri}/${values.role}Registration`);

              const apiRes = await axios.post(
                `${apiuri}/${values.role}Registration`,
                {
                  ...userDetails,
                }
              );
              console.log(apiRes.data);
              resetForm();
            }}
          >
            <Form className="row">
              <h3 className="text-center">Registration</h3>

              <div className="mb-3 col-md-6">
                <label htmlFor="username">User Name</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="username"
                  component="div"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="email"
                  component="div"
                />
              </div>

              <div className="col-md-6">
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

              <div className="mb-3 col-md-6">
                <label htmlFor="phonenumber">Phone Number</label>
                <Field type="tel" name="phonenumber" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="phonenumber"
                  component="div"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="dataofjoin">Date of Joining</label>
                <Field type="date" name="dataofjoin" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="dataofjoin"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label>Role:</label>
                <br />
                <Field as="select" name="role">
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

              <div className="mb-3">
                <label htmlFor="city">City</label>
                <br />
                <Field type="text" name="city" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="city"
                  component="div"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="zipCode">Zip Code</label>
                <br />
                <Field type="text" name="zipCode" className="form-control" />
                <ErrorMessage
                  className="err small"
                  name="zipCode"
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


import { useState } from "react";
import { validateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { mentors,students } from "../constants";

export function Login() {
    

  return (
    <div className="container-fluid loginpage">
      <div className="card w-50">
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "", role: "" }}
            validationSchema={validateform}
            onSubmit={(values) => {

                const role=(values.role=="mentor")?mentors:students;

                const auth=role.some(user=>user.username===values.username && user.password===values.password);

                if(auth){
                    localStorage.setItem("login",JSON.stringify(values))
                }else{
                    alert(`${values.username} is not a ${values.role} list`)
                }
            }}
          >
            <Form>
              <h3 className="text-center">Login</h3>
              <div className="mb-3">
                <label htmlFor="username">User Name</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage className="err small" name="username" component="div" />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage className="err small" name="password" component="div" />
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

                <ErrorMessage className="err small" name="role" component="div" />
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

export function Registration() {
  return (
    <div className="container-fluid loginpage">
      <div className="card w-75">
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "",Cpassword:'',email:'', age:'',role: "" }}
            validationSchema={validateform}
            onSubmit={(values) => {

                console.log('register');

                
                localStorage.setItem("register",JSON.stringify(values))
                
            }}
          >
            <Form>
              <h3 className="text-center">Login</h3>

              <div className="mb-3">
                <label htmlFor="username">User Name</label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage className="err small" name="username" component="div" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field type="text" name="email" className="form-control" />
                <ErrorMessage className="err small" name="email" component="div" />
              </div>

              <div className="mb-3">
                <label htmlFor="age">Age</label>
                <Field type="text" name="age" className="form-control" />
                <ErrorMessage className="err small" name="age" component="div" />
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

                <ErrorMessage className="err small" name="role" component="div" />
              </div>

              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage className="err small" name="password" component="div" />
              </div>

              <div className="mb-3">
                <label htmlFor="Cpassword">Confirm Password</label>
                <br />
                <Field
                  type="password"
                  name="Cpassword"
                  className="form-control"
                />
                <ErrorMessage className="err small" name="Cpassword" component="div" />
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
  )
}



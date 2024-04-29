
import { Registervalidateform } from "../Validatation/validateform";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { apiuri } from "../constants";
import axios from "axios";




export default function Registration() {
  return (
    <div className="container-fluid loginpage">
      <div className="card w-75">
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "",Cpassword:'',email:'', age:'',role: "" }}
            validationSchema={Registervalidateform}
            onSubmit={async (values) => {

                console.log('register');

                const userDetails={ 
                    username:values.username, 
                    password:values.password,
                    email:values.email, 
                    age:values.age 
                    }

                //console.log(`${apiuri}/${values.role}Registration`);

                const apiRes= await axios.post(`${apiuri}/${values.role}Registration`,{
                    ...userDetails,
                })
                console.log(apiRes.data);
                
            }}
          >
            <Form>
              <h3 className="text-center">Registration</h3>

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

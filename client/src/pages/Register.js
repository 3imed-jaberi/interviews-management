import React from "react";
import { useFormik } from 'formik';
import { Input } from '../components/Input';
import { register } from "../services/user.service";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory()
  const {
    values,
    setValues,
    handleChange,
    submitCount,
    handleSubmit
  } = useFormik({
    initialValues: {
      check: false,
      username: '',
      password: '',
      retypedPassword: '',
      email: "",
      firstname: "",
      lastname: ""
    },
    onSubmit: async values => {

      if (values.check) {
        const [ok] = await register(values)

        if (ok) {
          // TODO: redirect to login
          history.push('/login')
        }
      }
    }
  });


  return (
    <div className="card mt-3 mb-6 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username:"
            type="text"
            value={values.username}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Password:"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          <Input
            name="retypedPassword"
            label="Re-type password:"
            type="password"
            value={values.retypedPassword}
            onChange={handleChange}
          />
          <Input
            name="email"
            label="E-mail:"
            type="text"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            name="firstname"
            label="Fisrt Name:"
            type="text"
            value={values.firstname}
            onChange={handleChange}
          />

          <Input
            name="lastname"
            label="Last Name:"
            type="text"
            value={values.lastname}
            onChange={handleChange}
          />

          <div className="form-check form-group">
            <input
              className="form-check-input"
              type="checkbox"
              value={false}
              onClick={() => setValues({ ...values, check: !values.check })}
            />
            <label className="form-check-label">I agree to the terms and conditions</label>
            {submitCount > 0 && !values.check && <h5 className='alert alert-danger'> should you agreee .. </h5>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-big btn-block"
            disabled={false}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
